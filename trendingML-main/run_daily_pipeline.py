from dotenv import load_dotenv
import time
import sys
import logging
import importlib

# Pipeline modules
import pipeline.youtube_to_sheet
import pipeline.sheet_to_storage
import pipeline.update_history
import pipeline.feature_engineering
import pipeline.predict_trending

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

def run_pipeline():
    logging.info("🚀 Starting trending pipeline execution...")
    try:
        # We use a list of modules to run in sequence
        modules = [
            pipeline.youtube_to_sheet,
            pipeline.sheet_to_storage,
            pipeline.update_history,
            pipeline.feature_engineering,
            pipeline.predict_trending
        ]
        
        for module in modules:
            # Reload module to pick up any changes (optional but safe)
            importlib.reload(module)
            # Call the run() function in each module
            module.run()
            
        logging.info("✅ Pipeline execution successful")
    except Exception as e:
        logging.error(f"❌ Pipeline failed: {str(e)}")

if __name__ == "__main__":
    load_dotenv()
    # Run once immediately
    run_pipeline()
    
    # Then loop every 6 hours
    WAIT_TIME = 6 * 3600  # 6 hours in seconds
    logging.info(f"⏰ Scheduler active. Next run in 6 hours.")
    
    while True:
        time.sleep(WAIT_TIME)
        run_pipeline()
