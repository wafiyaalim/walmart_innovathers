from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class InvoiceLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    invoice_id = db.Column(db.String, nullable=False)
    invoice_json = db.Column(db.JSON, nullable=False)
    rule_violations = db.Column(db.PickleType)
    anomaly_flag = db.Column(db.Boolean)
    anomaly_score = db.Column(db.Float)
    explanation = db.Column(db.String)
    status = db.Column(db.String)
    user_feedback = db.Column(db.Boolean, default=None)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
