# Movie Review Analyzer

A movie review sentiment analyzer with a FastAPI backend and a React frontend.

## Project Structure

```text
Movie-Review-Analyzer-AI/
├── backend/
│   ├── main.py
│   ├── train.py
│   ├── model.joblib
│   ├── requirements.txt
│   └── .gitignore
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
└── README.md
```

## Run the app

### Backend

Create and activate a Python virtual environment, then install and run the API:

```bash
pip install -r backend/requirements.txt
uvicorn main:app --reload --app-dir backend
```

The API runs at `http://localhost:8000`.

### Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal (usually `http://localhost:5173`).
The review form and result panel are ready for your API integration.

## Technologies

- React
- Vite
- FastAPI
- scikit-learn
- NLTK
- Joblib
