import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-code">404</span>
        <h1>Page not found</h1>
        <p>
          The page you are looking for does not exist or has been moved. Start from the homepage or run the scanner to
          find your first automation opportunity.
        </p>
        <div className="not-found-actions">
          <Link className="button-primary" href="/">
            Back to Home
          </Link>
          <Link className="button-secondary dark" href="/scanner">
            Run the Scanner
          </Link>
        </div>
      </div>
    </main>
  );
}
