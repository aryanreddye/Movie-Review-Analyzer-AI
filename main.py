
from pathlib import Path

import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Load our already-trained model
MODEL_PATH = Path(__file__).resolve().parent / "model.joblib"
model = joblib.load(MODEL_PATH)

app = FastAPI(title="Movie Sentiment AI")

# Allow our React development server to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ReviewRequest(BaseModel):
    review: str = Field(min_length=1, max_length=10000)


@app.get("/")
def home():
    return {"message": "Movie Sentiment AI is running!"}


@app.post("/predict")
def predict_sentiment(request: ReviewRequest):
    review = request.review.strip()

    if not review:
        return {"error": "Please enter a movie review."}

    prediction = model.predict([review])[0]
    probabilities = model.predict_proba([review])[0]
    confidence = float(max(probabilities))

    return {
        "review": review,
        "sentiment": prediction,
        "confidence": round(confidence, 4),
    }
