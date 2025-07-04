# escalation.py
import os
from datetime import datetime, timedelta
from models import db, Order, EscalationRule, Supplier
from slack_sdk import WebClient
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

load_dotenv()

slack_client = WebClient(token=os.getenv("SLACK_BOT_TOKEN"))
sendgrid_client = SendGridAPIClient(api_key=os.getenv("SENDGRID_API_KEY"))
FROM_EMAIL = os.getenv("FROM_EMAIL")

def send_slack_message(channel, message):
    slack_client.chat_postMessage(channel=channel, text=message)

def send_email(to, subject, content):
    message = Mail(from_email=FROM_EMAIL, to_emails=to, subject=subject, plain_text_content=content)
    try:
        response = sendgrid_client.send(message)
        print("SendGrid Response:", response.status_code)
    except Exception as e:
        print("SendGrid Error:", e)


def run_escalation_check(app):
    with app.app_context():
        now = datetime.utcnow()
        print(f"[RUNNING] Escalation check at {now}")
        orders = Order.query.all()

        for order in orders:
            rule = EscalationRule.query.filter_by(supplier_id=order.supplier_id).first()
            if not rule:
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

def escalate(order, rule, level):
    message = f"[SLA Breach] Order #{order.id} for supplier {order.supplier_id} has missed its SLA (level: {level.upper()})."

    if level == "reminder":
        send_email(rule.supplier_email, "Reminder: SLA Breach", message)
        log_communication(order.id, order.supplier_id, "email", message)

    elif level == "lead":
        send_slack_message(rule.slack_channel, f"⏰ Escalation to Team Lead: {message}")
        log_communication(order.id, order.supplier_id, "slack", f"Escalation to Team Lead: {message}")

    elif level == "manager":
        send_slack_message(rule.slack_channel, f"🚨 Escalation to Procurement Manager: {message}")
        send_email(rule.supplier_email, "Final Escalation: SLA Breach", message)
        log_communication(order.id, order.supplier_id, "slack", f"Escalation to Manager: {message}")
        log_communication(order.id, order.supplier_id, "email", message)

    order.escalated_level = level
    db.session.commit()

    
from models import CommunicationLog

def log_communication(order_id, supplier_id, channel, message):
    log = CommunicationLog(
        order_id=order_id,
        supplier_id=supplier_id,
        channel=channel,
        message=message
    )
    db.session.add(log)
    db.session.commit()