import os
import logging
from datetime import datetime, timedelta
from models import db, Order, EscalationRule, Supplier
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

slack_client = WebClient(token=os.getenv("SLACK_BOT_TOKEN"))
sendgrid_client = SendGridAPIClient(api_key=os.getenv("SENDGRID_API_KEY"))
FROM_EMAIL = os.getenv("FROM_EMAIL")

def send_slack_message(channel, message):
    """Send Slack message with proper error handling"""
    try:
        response = slack_client.chat_postMessage(channel=channel, text=message)
        logger.info(f"Slack message sent successfully to {channel}")
        return True
    except SlackApiError as e:
        error_code = e.response['error']
        if error_code == 'channel_not_found':
            logger.error(f"Slack channel not found: {channel}. Please check if the channel exists and bot has access.")
        elif error_code == 'not_in_channel':
            logger.error(f"Bot not in channel: {channel}. Please invite the bot to the channel.")
        elif error_code == 'invalid_auth':
            logger.error("Slack authentication failed. Please check SLACK_BOT_TOKEN.")
        else:
            logger.error(f"Slack API error: {error_code} - {e}")
        return False
    except Exception as e:
        logger.error(f"Unexpected error sending Slack message: {e}")
        return False

def send_email(to, subject, content):
    """Send email with error handling"""
    try:
        message = Mail(from_email=FROM_EMAIL, to_emails=to, subject=subject, plain_text_content=content)
        response = sendgrid_client.send(message)
        logger.info(f"Email sent successfully to {to}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {to}: {e}")
        return False

def run_escalation_check(app):
    """Run escalation check with better error handling"""
    with app.app_context():
        now = datetime.utcnow()
        logger.info(f"[RUNNING] Escalation check at {now}")
        
        try:
            orders = Order.query.all()
            logger.info(f"Processing {len(orders)} orders")

            for order in orders:
                rule = EscalationRule.query.filter_by(supplier_id=order.supplier_id).first()
                if not rule:
                    logger.warning(f"No escalation rule found for supplier {order.supplier_id}")
                    continue

                if order.delivery_done:
                    continue  # Already delivered

                delay = now - order.delivery_due
                minutes_late = delay.total_seconds() / 60

                if minutes_late >= rule.manager_delay and order.escalated_level != "manager":
                    escalate(order, rule, "manager")
                elif minutes_late >= rule.lead_delay and order.escalated_level != "lead":
                    escalate(order, rule, "lead")
                elif minutes_late >= rule.reminder_delay and order.escalated_level != "reminder":
                    escalate(order, rule, "reminder")
                    
        except Exception as e:
            logger.error(f"Error during escalation check: {e}")

def escalate(order, rule, level):
    """Escalate with proper error handling and logging"""
    try:
        message = f"[SLA Breach] Order #{order.id} for supplier {order.supplier_id} has missed its SLA (level: {level.upper()})."
        logger.info(f"Escalating order {order.id} to level {level}")

        if level == "reminder":
            success = send_email(rule.supplier_email, "Reminder: SLA Breach", message)
            if success:
                log_communication(order.id, order.supplier_id, "email", message)

        elif level == "lead":
            slack_message = f"⏰ Escalation to Team Lead: {message}"
            success = send_slack_message(rule.slack_channel, slack_message)
            if success:
                log_communication(order.id, order.supplier_id, "slack", f"Escalation to Team Lead: {message}")

        elif level == "manager":
            slack_message = f"🚨 Escalation to Procurement Manager: {message}"
            slack_success = send_slack_message(rule.slack_channel, slack_message)
            email_success = send_email(rule.supplier_email, "Final Escalation: SLA Breach", message)
            
            if slack_success:
                log_communication(order.id, order.supplier_id, "slack", f"Escalation to Manager: {message}")
            if email_success:
                log_communication(order.id, order.supplier_id, "email", message)

        # Update escalation level regardless of notification success
        order.escalated_level = level
        db.session.commit()
        logger.info(f"Order {order.id} escalation level updated to {level}")
        
    except Exception as e:
        logger.error(f"Error escalating order {order.id}: {e}")
        # Rollback any database changes
        db.session.rollback()

from models import CommunicationLog

def log_communication(order_id, supplier_id, channel, message):
    """Log communication with error handling"""
    try:
        log = CommunicationLog(
            order_id=order_id,
            supplier_id=supplier_id,
            channel=channel,
            message=message
        )
        db.session.add(log)
        db.session.commit()
        logger.info(f"Communication logged for order {order_id}")
    except Exception as e:
        logger.error(f"Failed to log communication: {e}")
        db.session.rollback()

def validate_slack_channels():
    """Utility function to validate all Slack channels in escalation rules"""
    try:
        rules = EscalationRule.query.all()
        logger.info(f"Validating {len(rules)} Slack channels...")
        
        for rule in rules:
            try:
                # Try to get channel info
                response = slack_client.conversations_info(channel=rule.slack_channel)
                channel_name = response['channel']['name']
                logger.info(f"✓ Channel valid: {rule.slack_channel} ({channel_name})")
            except SlackApiError as e:
                logger.error(f"✗ Channel invalid: {rule.slack_channel} - {e.response['error']}")
                
    except Exception as e:
        logger.error(f"Error validating channels: {e}")

# Add this function to your app.py to run channel validation
def setup_escalation_validation(app):
    """Call this once when your app starts to validate configuration"""
    with app.app_context():
        validate_slack_channels()