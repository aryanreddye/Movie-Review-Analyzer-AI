
import nltk
import joblib

from nltk.corpus import movie_reviews
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report


# 1. Download the dataset
nltk.download("movie_reviews", quiet=True)

# 2. Load reviews and their labels
reviews = []
labels = []

for category in movie_reviews.categories():
    for file_id in movie_reviews.fileids(category):
        words = movie_reviews.words(file_id)
        review = " ".join(words)

        reviews.append(review)
        labels.append(category)

print("Total reviews:", len(reviews))


# 3. Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    reviews,
    labels,
    test_size=0.20,
    random_state=42,
    stratify=labels
)

print("Training reviews:", len(X_train))
print("Testing reviews:", len(X_test))


# 4. Build the machine learning pipeline
model = Pipeline([
    (
        "tfidf",
        TfidfVectorizer(
            lowercase=True,
            stop_words="english",
            max_features=20000,
            ngram_range=(1, 2)
        )
    ),
    (
        "classifier",
        LogisticRegression(max_iter=1000)
    )
])


# 5. Train the model
print("\nTraining model...")
model.fit(X_train, y_train)
print("Training complete!")


# 6. Evaluate the model on unseen reviews
predictions = model.predict(X_test)

print("\nAccuracy:", accuracy_score(y_test, predictions))
print("\nDetailed evaluation:")
print(classification_report(y_test, predictions))


# 7. Save the trained model
joblib.dump(model, "model.joblib")
print("Saved model to model.joblib")


# 8. Test it with our own reviews
examples = [
    "This movie was brilliant, emotional, and beautifully acted.",
    "Terrible writing, boring scenes, and an awful ending."
]

for review in examples:
    prediction = model.predict([review])[0]
    probabilities = model.predict_proba([review])[0]
    confidence = max(probabilities)

    print("\nReview:", review)
    print("Prediction:", prediction)
    print(f"Model confidence: {confidence:.1%}")
