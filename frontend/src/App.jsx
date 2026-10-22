import { useState } from "react";

const MAX_REVIEW_LENGTH = 10000;
const SAMPLE_REVIEW =
  "A beautifully told story with a magnetic lead performance. Every scene feels intentional, the score stays with you long after the credits, and I found myself thinking about the ending for days. Easily one of my favorites.";

function FilmIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 4v16M17 4v16M3 9h4m-4 6h4m10-6h4m-4 6h4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path d="m12 2 1.9 7.1L21 11l-7.1 1.9L12 20l-1.9-7.1L3 11l7.1-1.9L12 2Z" />
      <path d="m19 15 .95 2.05L22 18l-2.05.95L19 21l-.95-2.05L16 18l2.05-.95L19 15Z" />
    </svg>
  );
}

function App() {
  const [review, setReview] = useState("");
  const [notice, setNotice] = useState("");

  function analyzeReview(event) {
    event.preventDefault();
    if (!review.trim()) return;
    setNotice("Your review is ready. Connect your API to display its analysis here.");
  }

  function clearReview() {
    setReview("");
    setNotice("");
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="CineScope home">
          <span className="brand-mark">
            <FilmIcon />
          </span>
          <span>
            cine<span className="brand-light">scope</span>
          </span>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#analyzer">Analyzer</a>
          <a href="#how-it-works">How it works</a>
        </nav>
        <a className="header-pill" href="#analyzer">
          <span className="status-dot" />
          Sentiment studio
        </a>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              THE STORY BEHIND THE STARS
            </div>
            <h1 id="hero-title">
              Every review
              <br />
              has a <em>feeling.</em>
            </h1>
            <p>
              Drop in a movie review. Let our AI find the feeling hiding
              between the lines.
            </p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit art-orbit-one" />
            <div className="art-orbit art-orbit-two" />
            <div className="art-sun" />
            <div className="art-horizon" />
            <span className="art-caption">A NEW PERSPECTIVE</span>
            <span className="art-index">01 / 01</span>
          </div>
        </section>

        <section className="analyzer-grid" id="analyzer" aria-label="Review analyzer">
          <form className="review-card" onSubmit={analyzeReview}>
            <div className="card-heading">
              <div>
                <span className="section-kicker">01 — YOUR REVIEW</span>
                <h2>What did you think?</h2>
              </div>
              <span className="input-icon">
                <FilmIcon />
              </span>
            </div>

            <label className="sr-only" htmlFor="review">
              Movie review
            </label>
            <textarea
              id="review"
              maxLength={MAX_REVIEW_LENGTH}
              onChange={(event) => {
                setReview(event.target.value);
                if (notice) setNotice("");
              }}
              placeholder="The film opens with a stunning shot that immediately pulls you in..."
              value={review}
            />

            <div className="textarea-meta">
              <button
                className="sample-button"
                onClick={() => {
                  setReview(SAMPLE_REVIEW);
                  setNotice("");
                }}
                type="button"
              >
                <SparkleIcon />
                Try a sample
              </button>
              <span className="character-count">
                {review.length.toLocaleString()} / {MAX_REVIEW_LENGTH.toLocaleString()}
              </span>
            </div>

            {notice && (
              <p className="info-message" role="status">
                <span aria-hidden="true">i</span>
                {notice}
              </p>
            )}

            <div className="form-actions">
              <button
                className="analyze-button"
                disabled={!review.trim()}
                type="submit"
              >
                Analyze review
                <ArrowIcon />
              </button>
              <button
                className="clear-button"
                disabled={!review && !notice}
                onClick={clearReview}
                type="button"
              >
                Clear
              </button>
            </div>
            <p className="privacy-note">
              Your review is analyzed instantly and never stored.
            </p>
          </form>

          <section
            className="result-card"
            aria-live="polite"
            aria-label="Analysis result"
          >
            <div className="card-heading result-heading">
              <div>
                <span className="section-kicker">02 — THE VERDICT</span>
                <h2>The feeling is...</h2>
              </div>
              <span className="result-sparkle">
                <SparkleIcon />
              </span>
            </div>

            <div className="result-empty">
              <div className="empty-illustration" aria-hidden="true">
                <span className="empty-orbit" />
                <span className="empty-star">✳</span>
                <span className="empty-dot" />
              </div>
              <p>Your result will appear here</p>
              <span>A little insight is just one review away.</span>
            </div>

            <div className="result-footnote">
              <span className="footnote-dot" />
              Powered by machine learning
            </div>
          </section>
        </section>

        <section className="how-section" id="how-it-works">
          <span className="section-kicker">A LITTLE FILM MAGIC</span>
          <div className="how-content">
            <h2>
              From your words
              <br />
              to the <em>big picture.</em>
            </h2>
            <p>
              CineScope reads the tone of your review and gives it a simple,
              thoughtful verdict. No scores to decode — just the sentiment,
              clearly.
            </p>
            <div className="how-steps">
              <div>
                <span>01</span>
                <p>Write what you felt</p>
              </div>
              <div>
                <span>02</span>
                <p>Let the AI read the room</p>
              </div>
              <div>
                <span>03</span>
                <p>See the sentiment</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#" aria-label="CineScope home">
          <span className="brand-mark">
            <FilmIcon />
          </span>
          <span>
            cine<span className="brand-light">scope</span>
          </span>
        </a>
        <p>For the love of the movies — and the feelings they leave behind.</p>
        <span className="footer-credit">MADE FOR MOVIE LOVERS <span>✳</span></span>
      </footer>
    </div>
  );
}

export default App;
