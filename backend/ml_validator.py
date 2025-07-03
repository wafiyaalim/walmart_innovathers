import joblib
import numpy as np
import os

model_path = os.path.join("model", "isolation_forest_model.pkl")
encoder_path = os.path.join("model", "region_encoder.pkl")

model = joblib.load(model_path)
region_encoder = joblib.load(encoder_path)

def run_ml_checks(invoice):
    try:
        region_encoded = region_encoder.transform([invoice["region"]])[0]
    except:
        region_encoded = 0

    features = np.array([[
        invoice["billed_distance"],
        invoice["billed_amount"],
        invoice["fuel_surcharge"],
        region_encoded
    ]])

    score = model.decision_function(features)[0]
    anomaly = model.predict(features)[0] == -1
    explanation = "Anomalous" if anomaly else "Normal"

    return anomaly, float(score), explanation
