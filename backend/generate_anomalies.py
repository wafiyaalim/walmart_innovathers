import pandas as pd
import random

regions = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune"]
data = []

for i in range(100):
    distance = random.randint(50, 500)
    base_cost = distance * random.uniform(10, 60)
    fuel_surcharge = base_cost * random.uniform(0.25, 0.5)
    region = random.choice(regions)

    data.append({
        "invoice_id": f"INV_A{i+2000}",
        "distance": distance,
        "freight_cost": round(base_cost, 2),
        "fuel_surcharge": round(fuel_surcharge, 2),
        "region": region,
        "label": 1
    })

pd.DataFrame(data).to_csv("anomalous_invoices.csv", index=False)
print("⚠️ anomalous_invoices.csv generated")