from fastapi import FastAPI
import json
import os
import threading
import time
import logging
import sys
from contextlib import asynccontextmanager

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)

# Ensure current directory is in path for relative imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(os.getcwd())

def run_scheduler():
    logging.info("Scheduler thread started.")
    # Import the pipeline runner
    # We use a delayed import to avoid circular dependencies if any
    from run_daily_pipeline import run_pipeline
    
    # Run once on start
    run_pipeline()
    
    WAIT_TIME = 6 * 3600 # 6 hours
    while True:
        time.sleep(WAIT_TIME)
        run_pipeline()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start the scheduler in a background thread
    scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
    scheduler_thread.start()
    yield
    # Cleanup if needed

app = FastAPI(lifespan=lifespan)

@app.get("/trending")
def get_trending():
    json_path = "output/trending_top3.json"
    if not os.path.exists(json_path):
        if os.path.exists("../output/trending_top3.json"):
            json_path = "../output/trending_top3.json"
        else:
            return {"top3": []}

    try:
        with open(json_path) as f:
            data = json.load(f)
            if isinstance(data, list):
                return {"top3": [{"Keyword": item.get("Keyword", str(item)), "GrowthRate": item.get("GrowthRate", 0)} if isinstance(item, dict) else {"Keyword": str(item), "GrowthRate": 0} for item in data]}
            return {"top3": []}
    except Exception as e:
        return {"top3": [], "error": str(e)}

@app.get("/")
def root():
    return {"status": "Trending ML API is running", "scheduler": "Active (6h loop)"}