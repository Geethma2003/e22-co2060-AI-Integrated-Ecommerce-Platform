import pandas as pd
from datetime import datetime, timedelta
import os

def run():
    TODAY = "storage/youtube_today.csv"
    HISTORY = "storage/youtube_history.csv"

    if not os.path.exists(TODAY):
        print(f"⚠️ {TODAY} not found. Skipping history update.")
        return

    # read today's data
    today = pd.read_csv(TODAY)
    today["Date"] = pd.to_datetime(today["Date"])

    # handle history safely
    if os.path.exists(HISTORY) and os.path.getsize(HISTORY) > 0:
        hist = pd.read_csv(HISTORY)
        hist["Date"] = pd.to_datetime(hist["Date"])
        df = pd.concat([hist, today])
    else:
        # first run OR empty file
        df = today

    # keep only last 10 days
    cutoff = datetime.now() - timedelta(days=10)
    df = df[df["Date"] >= cutoff]

    df.to_csv(HISTORY, index=False)
    print("✅ History updated successfully")

if __name__ == "__main__":
    run()
