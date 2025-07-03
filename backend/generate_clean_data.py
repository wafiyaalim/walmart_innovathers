import pandas as pd
import random

regions = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune"]
data = []

for i in range(400):
    distance = random.randint(50, 500)
    base_cost = distance * random.uniform(20, 30)
    fuel_surcharge = base_cost * random.uniform(0.05, 0.15)
    region = random.choice(regions)

    data.append({
        "invoice_id": f"INV{i+1000}",
        "distance": distance,
        "freight_cost": round(base_cost, 2),
        "fuel_surcharge": round(fuel_surcharge, 2),
        "region": region,
        "label": 0
    })

pd.DataFrame(data).to_csv("clean_invoices.csv", index=False)
print("✅ clean_invoices.csv generated")