import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Load and merge
df_clean = pd.read_csv("clean_invoices.csv")
df_anomaly = pd.read_csv("anomalous_invoices.csv")
df = pd.concat([df_clean, df_anomaly], ignore_index=True)

# Encode region
le = LabelEncoder()
df["region_encoded"] = le.fit_transform(df["region"])

# Train
features = df[["distance", "freight_cost", "fuel_surcharge", "region_encoded"]]
model = IsolationForest(n_estimators=100, contamination=0.2, random_state=42)
model.fit(features)

# Save
os.makedirs("model", exist_ok=True)
joblib.dump(model, "model/isolation_forest_model.pkl")
joblib.dump(le, "model/region_encoder.pkl")
print("✅ Model trained and saved")