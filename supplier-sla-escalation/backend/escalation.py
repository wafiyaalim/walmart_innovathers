from datetime import datetime, timedelta
from models import Order, EscalationRule
from models import EscalationLog, db
from utils import send_slack_message, send_email
from flask import current_app

def run_escalation_check():
    print("Running escalation check...")
    now = datetime.now()
    orders = Order.query.all()

    for order in orders:
        rule = EscalationRule.query.filter_by(supplier_id=order.supplier_id).first()
        if not rule:
            continue  # No rule set for this supplier

        # 1. Acknowledgment Check
        if not order.ack_done and now > order.ack_due + timedelta(minutes=rule.reminder_delay) and order.escalated_level == "none":
            escalate(order, rule, "reminder", "Acknowledgment overdue")

        elif not order.ack_done and now > order.ack_due + timedelta(minutes=rule.lead_delay) and order.escalated_level == "reminder":
            escalate(order, rule, "lead", "Acknowledgment delay escalated to Team Lead")

        elif not order.ack_done and now > order.ack_due + timedelta(minutes=rule.manager_delay) and order.escalated_level == "lead":
            escalate(order, rule, "manager", "Acknowledgment escalated to Procurement Manager")

        # Repeat for dispatch
        if not order.dispatch_done and now > order.dispatch_due and order.escalated_level == "none":
            escalate(order, rule, "reminder", "Dispatch overdue")

        # Repeat for delivery
        if not order.delivery_done and now > order.delivery_due and order.escalated_level == "none":
            escalate(order, rule, "reminder", "Delivery overdue")

def escalate(order, rule, level):
    message = f"SLA missed by Supplier ID {order.supplier_id} on {level} milestone."

    # Slack
    send_slack_message(rule.slack_channel, f"🚨 Escalation to {level.title()}: {message}")

    # Email
    send_email(rule.supplier_email, f"SLA Escalation: Supplier {order.supplier_id} - {level} delay", message)

    # Save Log
    log = EscalationLog(order_id=order.id, level=level, message=message)
    db.session.add(log)
    db.session.commit()
