# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Supplier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    escalation_rules = db.relationship('EscalationRule', backref='supplier')

class EscalationRule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'))
    slack_channel = db.Column(db.String(100))
    supplier_email = db.Column(db.String(100))
    reminder_delay = db.Column(db.Integer)
    lead_delay = db.Column(db.Integer)
    manager_delay = db.Column(db.Integer)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    supplier_id = db.Column(db.Integer)
    ack_due = db.Column(db.DateTime)
    dispatch_due = db.Column(db.DateTime)
    delivery_due = db.Column(db.DateTime)
    ack_done = db.Column(db.DateTime, nullable=True)
    dispatch_done = db.Column(db.DateTime, nullable=True)
    delivery_done = db.Column(db.DateTime, nullable=True)
    escalated_level = db.Column(db.String(50), default="none")
    
class EscalationLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    level = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    message = db.Column(db.Text)

    order = db.relationship('Order', backref='escalation_logs')