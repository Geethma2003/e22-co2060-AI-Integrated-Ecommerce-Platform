import pandas as pd
import os

def run():
    HISTORY_FILE = "storage/youtube_history.csv"
    if not os.path.exists(HISTORY_FILE):
        print("⚠️ History file not found. Skipping feature engineering.")
        return

    df = pd.read_csv(HISTORY_FILE)
    if df.empty:
        print("⚠️ History file is empty.")
        return

    df["Date"] = pd.to_datetime(df["Date"])

    rows = []

    for k in df["Keyword"].unique():
        d = df[df["Keyword"] == k].sort_values("Date")
        last5 = d.tail(5)
        prev5 = d.iloc[-10:-5]

        if len(last5) < 3:
            continue

        rows.append({
            "Keyword": k,
            "GrowthRate": last5["Total Views"].mean() / (prev5["Total Views"].mean() + 1),
            "Acceleration": last5["Total Views"].iloc[-1] - last5["Total Views"].iloc[0],
            "Consistency": last5["Total Views"].std(),
            "RelativePerformance": last5["Total Views"].mean() / df["Total Views"].mean()
        })

    if rows:
        pd.DataFrame(rows).to_csv("storage/features.csv", index=False)
        print(f"✅ Features generated for {len(rows)} keywords.")
    else:
        print("⚠️ Not enough data points for any keyword to generate features.")

if __name__ == "__main__":
    run()
