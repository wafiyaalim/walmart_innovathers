from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import json
import pdfplumber
import io
import re

# Custom rule-based and ML-based validators
from rule_validator import run_rule_checks
from ml_validator import run_ml_checks

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# SQLite DB configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///invoice_logs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database model
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

# Create DB tables
with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return "Invoice Validation Backend is Running ✅"

@app.route("/validate-invoice", methods=["POST"])
def validate_invoice():
    try:
        invoice = request.get_json()
        print("Received Invoice:", invoice)

        # Run rule-based and ML-based validations
        rule_violations = run_rule_checks(invoice)
        ml_result = run_ml_checks(invoice)

        # Convert to native Python types to avoid JSON serialization issues
        anomaly_flag = bool(ml_result["combined_flag"])
        anomaly_score = float(ml_result["ml"]["anomaly_score"]) + float(ml_result["heuristic"]["anomaly_score"])
        explanation = f"ML: {ml_result['ml']['explanation']} | Heuristic: {ml_result['heuristic']['explanation']}"
        status = "flagged" if anomaly_flag or rule_violations else "cleared"

        # Save log to DB
        entry = InvoiceLog(
            invoice_id=invoice["invoice_id"],
            invoice_json=invoice,
            rule_violations=rule_violations,
            anomaly_flag=anomaly_flag,
            anomaly_score=anomaly_score,
            explanation=explanation,
            status=status,
        )
        db.session.add(entry)
        db.session.commit()

        return jsonify({
            "invoice_id": invoice["invoice_id"],
            "ml_validation": {
                "anomaly_flag": anomaly_flag,
                "anomaly_score": anomaly_score,
                "explanation": explanation
            },
            "rule_violations": rule_violations,
            "status": status
        })
    except Exception as e:
        print("❌ Backend error:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/sample-invoice", methods=["GET"])
def get_sample_invoice():
    with open('sample_invoice.json') as f:
        data = json.load(f)
    return jsonify(data)

# Helper function to extract data using regex
def extract_field(pattern, text, cast_type=str):
    match = re.search(pattern, text)
    if match:
        try:
            return cast_type(match.group(1).strip())
        except:
            return None
    return None

@app.route("/upload-pdf", methods=["POST"])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        with pdfplumber.open(io.BytesIO(file.read())) as pdf:
            text = ''
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + '\n'

        # Extracted using regex from raw text
        extracted_data = {
            "invoice_id": extract_field(r"Invoice ID:\s*(\S+)", text),
            "invoice_date": extract_field(r"Invoice Date:\s*(\d{4}-\d{2}-\d{2})", text),
            "delivery_date": extract_field(r"Delivery Date:\s*(\d{4}-\d{2}-\d{2})", text),
            "region": extract_field(r"Region:\s*(\w+)", text),
            "billed_amount": extract_field(r"Billed Amount:\s*(\d+)", text, int),
            "contracted_amount": extract_field(r"Contracted Amount:\s*(\d+)", text, int),
            "billed_distance": extract_field(r"Billed Distance:\s*(\d+)", text, int),
            "contracted_distance": extract_field(r"Contracted Distance:\s*(\d+)", text, int),
            "fuel_surcharge": extract_field(r"Fuel Surcharge:\s*(\d+)", text, int),
            "origin_lat": extract_field(r"Origin Lat:\s*([\d.]+)", text, float),
            "origin_lon": extract_field(r"Origin Lon:\s*([\d.]+)", text, float),
            "destination_lat": extract_field(r"Destination Lat:\s*([\d.]+)", text, float),
            "destination_lon": extract_field(r"Destination Lon:\s*([\d.]+)", text, float),
            "raw_text": text.strip()
        }

        return jsonify(extracted_data)

    except Exception as e:
        return jsonify({'error': f"PDF parsing failed: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)