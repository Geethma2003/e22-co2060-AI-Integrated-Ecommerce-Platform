import pandas as pd
import os
from models.trend_model import score
import json

def run():
    FEATURES_FILE = "storage/features.csv"
    OUTPUT_FILE = "output/trending_top3.json"

    # Basic existence check
    if not os.path.exists(FEATURES_FILE):
        print("⚠️ Features file not found. Waiting for more data.")
        return

    # Safe read
    try:
        df = pd.read_csv(FEATURES_FILE)
    except pd.errors.EmptyDataError:
        print("⚠️ Features file exists but is empty. Waiting for more data.")
        return

    # No rows case
    if df.empty:
        print("⚠️ Not enough historical data to generate trends yet.")
        return

    # Normal prediction
    top3 = score(df).head(3)

    os.makedirs("output", exist_ok=True)
    
    # Save as records list (Backend expects this format)
    top3.to_json(OUTPUT_FILE, orient="records")

    print(f"🔥 Top-{len(top3)} trending products generated successfully")

if __name__ == "__main__":
    run()