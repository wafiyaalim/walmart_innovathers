from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Supplier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    escalation_rules = db.relationship('EscalationRule', backref='supplier')
    orders = db.relationship('Order', backref='supplier')

class EscalationRule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'), nullable=False)
    slack_channel = db.Column(db.String(100), nullable=False)
    supplier_email = db.Column(db.String(100), nullable=False)
    reminder_delay = db.Column(db.Integer, nullable=False)  # in minutes
    lead_delay = db.Column(db.Integer, nullable=False)
    manager_delay = db.Column(db.Integer, nullable=False)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    supplier_id = db.Column(db.Integer, db.ForeignKey('supplier.id'), nullable=False)
    ack_due = db.Column(db.DateTime, nullable=False)
    dispatch_due = db.Column(db.DateTime, nullable=False)
    delivery_due = db.Column(db.DateTime, nullable=False)
    ack_done = db.Column(db.DateTime, nullable=True)
    dispatch_done = db.Column(db.DateTime, nullable=True)
    delivery_done = db.Column(db.DateTime, nullable=True)
    escalated_level = db.Column(db.String(50), default="none")