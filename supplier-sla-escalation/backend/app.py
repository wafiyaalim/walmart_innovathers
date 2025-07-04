# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from models import db, Order, EscalationRule, Supplier,EscalationLog
from flask import Flask,request,jsonify
from models import db
from datetime import datetime
from models import Order 
from models import Supplier
from models import EscalationRule
from escalation import run_escalation_check
import schedule
import time
import threading

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///orders.db'
db.init_app(app)

@app.route('/')
def home():
    return {"status": "Escalation API is running"}

@app.route('/create-supplier', methods=['POST'])
def create_supplier():
    data = request.get_json()
    supplier = Supplier(name=data['name'])
    db.session.add(supplier)
    db.session.commit()
    return jsonify({"message": "Supplier created", "id": supplier.id})

@app.route('/create-escalation-rule', methods=['POST'])
def create_escalation_rule():
    data = request.get_json()
    rule = EscalationRule(
        supplier_id=data['supplier_id'],
        slack_channel=data['slack_channel'],
        supplier_email=data['supplier_email'],
        reminder_delay=data['reminder_delay'],
        lead_delay=data['lead_delay'],
        manager_delay=data['manager_delay']
    )
    db.session.add(rule)
    db.session.commit()
    return jsonify({"message": "Rule created", "id": rule.id})

@app.route('/create-order', methods=['POST'])
def create_order():
    data = request.get_json()
@app.route('/favicon.ico')
def favicon():
    return '', 204  # or serve a real icon

@app.route('/.well-known/appspecific/com.chrome.devtools.json')
def chrome_devtools():
    return '', 204

def schedule_runner():
    while True:
        schedule.run_pending()
        time.sleep(1)

def start_scheduler(app):
    schedule.every(1).minutes.do(run_escalation_check, app=app)
    t = threading.Thread(target=schedule_runner)
    t.daemon = True
    t.start()
    
@app.route('/create-order', methods=['POST'])
def create_order():
    data = request.get_json()

    if not data or 'supplier_id' not in data:
        return jsonify({"error": "Missing or invalid 'supplier_id' in request"}), 400

    try:
        order = Order(
            supplier_id=data['supplier_id'],
            ack_due=datetime.fromisoformat(data['ack_due']),
            dispatch_due=datetime.fromisoformat(data['dispatch_due']),
            delivery_due=datetime.fromisoformat(data['delivery_due'])
        )
        db.session.add(order)
        db.session.commit()

        return jsonify({"message": "Order created", "id": order.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/update-order-status/<int:order_id>', methods=['POST'])
def update_order_status(order_id):
    data = request.get_json()
    order = Order.query.get(order_id)

    if not order:
        return jsonify({"error": "Order not found"}), 404

    if 'ack_done' in data:
        order.ack_done = datetime.now()
    if 'dispatch_done' in data:
        order.dispatch_done = datetime.now()
    if 'delivery_done' in data:
        order.delivery_done = datetime.now()

    db.session.commit()
    return jsonify({"message": "Order updated"})

@app.route('/orders')
def get_orders():
    orders = Order.query.all()
    return jsonify([{
        "id": o.id,
        "supplier_id": o.supplier_id,
        "ack_due": o.ack_due,
        "ack_done": o.ack_done,
        "dispatch_due": o.dispatch_due,
        "delivery_due": o.delivery_due,
        "escalated_level": o.escalated_level
    } for o in orders])

@app.route('/suppliers')
def get_suppliers():
    from models import Supplier
    suppliers = Supplier.query.all()
    return jsonify([{"id": s.id, "name": s.name} for s in suppliers])

@app.route('/escalation-logs')
def get_escalation_logs():
    logs = EscalationLog.query.order_by(EscalationLog.timestamp.desc()).all()
    return jsonify([
        {
            "id": log.id,
            "order_id": log.order_id,
            "level": log.level,
            "timestamp": log.timestamp.isoformat(),
            "message": log.message
        } for log in logs
    ])

def schedule_runner(app):
    while True:
        with app.app_context():  
            schedule.run_pending()
        time.sleep(1)

def start_scheduler(app):
    schedule.every(1).minutes.do(run_escalation_check)
    t = threading.Thread(target=schedule_runner, args=(app,))
    t.daemon = True
    t.start()

@app.route('/create-supplier', methods=['POST'])
def create_supplier():
    data = request.get_json()
    try:
        supplier = Supplier(name=data['name'])
        db.session.add(supplier)
        db.session.commit()
        return jsonify({"message": "Supplier created", "id": supplier.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/create-escalation-rule', methods=['POST'])
def create_escalation_rule():
    data = request.get_json()
    try:
        rule = EscalationRule(
            supplier_id=data['supplier_id'],
            slack_channel=data['slack_channel'],
            supplier_email=data['supplier_email'],
            reminder_delay=data['reminder_delay'],
            lead_delay=data['lead_delay'],
            manager_delay=data['manager_delay']
        )
        db.session.add(rule)
        db.session.commit()
        return jsonify({"message": "Escalation rule created", "id": rule.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400    
    

from models import CommunicationLog

@app.route('/communication-log', methods=['GET'])
def get_logs():
    logs = CommunicationLog.query.all()
    return jsonify([
        {
            "order_id": log.order_id,
            "supplier_id": log.supplier_id,
            "channel": log.channel,
            "message": log.message,
            "timestamp": log.timestamp.isoformat()
        } for log in logs
    ])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    start_scheduler(app)
    app.run(debug=True)
    app.run(port=4000,debug=True) 
