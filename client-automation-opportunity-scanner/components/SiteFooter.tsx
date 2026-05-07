import Image from "next/image";
import Link from "next/link";

const currentYear = new Date().getFullYear();

const footerNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Scanner", href: "/scanner" },
  { label: "Contact", href: "/#contact" }
];

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="footer-logo-link" href="/" aria-label="Diligent Designs Consulting home">
            <Image
              className="footer-logo"
              src="/ddc-logo-nav.png"
              alt=""
              width={512}
              height={512}
              unoptimized
            />
            <span className="footer-wordmark">Diligent Designs Consulting</span>
          </Link>
          <p className="footer-tagline">
            AI, automation, and marketing analytics for teams ready to clean up the work that matters.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <span className="footer-nav-heading">Navigate</span>
          <ul>
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-cta-block">
          <span className="footer-nav-heading">Get started</span>
          <p>Score your workflows and find the first automation worth building.</p>
          <Link className="button-primary footer-cta-button" href="/scanner">
            Run the Scanner
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <small>&copy; {currentYear} Diligent Designs Consulting. All rights reserved.</small>
      </div>
    </footer>
  );
}
