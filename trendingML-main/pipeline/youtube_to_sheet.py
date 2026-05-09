from dotenv import load_dotenv
load_dotenv()


import os
from googleapiclient.discovery import build
import pandas as pd
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
GOOGLE_SHEET_ID = os.getenv("GOOGLE_SHEET_ID")
MONGO_URI = os.getenv("MONGO_URI")

def get_keywords_from_db():
    try:
        from pymongo import MongoClient
        client = MongoClient(MONGO_URI)
        db = client.get_database() # Gets database from URI
        # Fetch all product names
        products = db.products.find({}, {"productName": 1})
        keywords = [p["productName"] for p in products if "productName" in p]
        client.close()
        
        if not keywords:
            print("⚠️ No products found in DB. Falling back to defaults.")
            return ["iPhone", "Samsung", "MacBook"]
            
        # 🔥 QUOTA PROTECTION: Pick 20 random products if there are many
        import random
        if len(keywords) > 20:
            print(f"📊 Total products: {len(keywords)}. Sampling 20 to save YouTube quota.")
            keywords = random.sample(keywords, 20)
            
        print(f"✅ Selected {len(keywords)} keywords for this run")
        return keywords
    except Exception as e:
        print(f"❌ Error fetching keywords from DB: {e}")
        return ["iPhone", "Samsung", "MacBook"]

MAX_RESULTS = 10

def run():
    KEYWORDS = get_keywords_from_db()
    
    youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)
    
    def fetch(keyword):
        try:
            search = youtube.search().list(
                q=keyword, part="id", type="video", maxResults=MAX_RESULTS
            ).execute()
        
            ids = [i["id"]["videoId"] for i in search["items"]]
            if not ids:
                return None
        
            stats = youtube.videos().list(
                part="statistics", id=",".join(ids)
            ).execute()
        
            views = sum(int(v["statistics"].get("viewCount", 0)) for v in stats["items"])
        
            return {
                "Date": datetime.now().strftime("%Y-%m-%d"),
                "Keyword": keyword,
                "Videos Analyzed": len(ids),
                "Total Views": views,
                "Average Views": views // len(ids)
            }
        except Exception as e:
            print(f"⚠️ Error fetching for {keyword}: {e}")
            return None

    print(f"🚀 Starting YouTube fetch for {len(KEYWORDS)} keywords...")
    rows = [fetch(k) for k in KEYWORDS]
    rows = [r for r in rows if r is not None]
    
    if not rows:
        print("❌ No data fetched from YouTube.")
        return

    df = pd.DataFrame(rows)
    
    scope = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive"
    ]
    creds = ServiceAccountCredentials.from_json_keyfile_name(
        "credentials.json", scope
    )
    client = gspread.authorize(creds)
    sheet = client.open_by_key(GOOGLE_SHEET_ID).sheet1
    
    sheet.clear()
    sheet.update("A1", [df.columns.tolist()])
    sheet.update("A2", df.values.tolist())
    print("✅ Data successfully written to Google Sheet.")

if __name__ == "__main__":
    run()