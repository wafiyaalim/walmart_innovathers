from datetime import datetime

def run_rule_checks(invoice):
    violations = []

    # 1. Cost mismatch
    if invoice.get("billed_amount") != invoice.get("contracted_amount"):
        violations.append("Cost mismatch")

    # 2. Date gap check (with error handling)
    try:
        delivery_date = datetime.strptime(invoice["delivery_date"], "%Y-%m-%d")
        invoice_date = datetime.strptime(invoice["invoice_date"], "%Y-%m-%d")
        if (invoice_date - delivery_date).days > 30:
            violations.append("Invoice submitted late")
        if delivery_date > invoice_date:
            violations.append("Delivery date is after invoice date")
    except Exception:
        violations.append("Invalid date format")

    # 3. Route deviation
    try:
        if invoice["billed_distance"] > invoice["contracted_distance"] * 1.2:
            violations.append("Route deviation")
    except:
        violations.append("Missing distance values")

    # 4. Fuel surcharge anomaly (optional)
    if invoice.get("fuel_surcharge", 0) > 150:
        violations.append("Unusually high fuel surcharge")

    # 5. Region check
    valid_regions = {"north", "south", "east", "west"}
    if invoice.get("region", "").lower() not in valid_regions:
        violations.append("Invalid region")

    return violations