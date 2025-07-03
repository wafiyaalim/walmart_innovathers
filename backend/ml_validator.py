import os
import joblib
import numpy as np

# Load trained ML model and region encoder
model_path = os.path.join("model", "isolation_forest_model.pkl")
encoder_path = os.path.join("model", "region_encoder.pkl")

try:
    model = joblib.load(model_path)
    region_encoder = joblib.load(encoder_path)
except Exception as e:
    print(f"❌ Model loading failed: {e}")
    model = None
    region_encoder = None

def run_ml_checks(invoice):
    # Run both ML and heuristic checks
    ml_result = run_ml_model(invoice)
    heuristic_result = run_heuristic_rules(invoice)

    # Combine results
    combined_flag = ml_result["anomaly_flag"] or heuristic_result["anomaly_flag"]

    return {
        "combined_flag": combined_flag,
        "ml": ml_result,
        "heuristic": heuristic_result
    }

# 1️⃣ ML-based detection
def run_ml_model(invoice):
    if model is None or region_encoder is None:
        return {
            "anomaly_flag": False,
            "anomaly_score": 0.0,
            "explanation": "ML model or encoder not loaded"
        }

    try:
        region = invoice.get("region", "unknown").lower()
        if region not in region_encoder.classes_:
            region_encoded = -1  # fallback or unknown region
        else:
            region_encoded = region_encoder.transform([region])[0]

        features = np.array([[  
            invoice.get("billed_distance", 0),
            invoice.get("billed_amount", 0),
            invoice.get("fuel_surcharge", 0),
            region_encoded
        ]])

        score = model.decision_function(features)[0]
        anomaly = model.predict(features)[0] == -1
        explanation = "Anomalous pattern" if anomaly else "Normal pattern"

        return {
            "anomaly_flag": anomaly,
            "anomaly_score": round(score, 2),
            "explanation": explanation
        }

    except Exception as e:
        return {
            "anomaly_flag": False,
            "anomaly_score": 0.0,
            "explanation": f"ML error: {str(e)}"
        }

# 2️⃣ Heuristic-based detection
def run_heuristic_rules(invoice):
    score = 0.0
    explanation = []

    if invoice.get("billed_amount", 0) > 1.5 * invoice.get("contracted_amount", 1):
        score += 0.6
        explanation.append("Billed amount unusually higher than contracted.")

    if invoice.get("fuel_surcharge", 0) > 200:
        score += 0.3
        explanation.append("Fuel surcharge exceeds expected max.")

    if invoice.get("billed_distance", 0) > 1.3 * invoice.get("contracted_distance", 1):
        score += 0.3
        explanation.append("Billed distance much greater than contracted.")

    flag = score > 0.8

    return {
        "anomaly_flag": flag,
        "anomaly_score": round(score, 2),
        "explanation": " ".join(explanation) if explanation else "No heuristic issues"
    }