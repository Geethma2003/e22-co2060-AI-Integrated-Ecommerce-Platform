FROM python:3.11-slim

WORKDIR /app

# Install system dependencies if any are needed for pandas/sklearn
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir python-dotenv

# Copy the rest of the application
COPY . .

# Create output directory
RUN mkdir -p output

# Expose the port FastAPI runs on
EXPOSE 8003

# Command to run the application
# We use the lifespan manager in main.py to start the scheduler
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8003"]
