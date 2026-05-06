"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Scanner", href: "/scanner" },
  { label: "Contact", href: "/#contact" }
];

export function SiteNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isScanner = pathname.startsWith("/scanner");

  const isCurrent = (href: string) => {
    if (href === "/scanner") return isScanner;
    if (href === "/") return pathname === "/";
    return false;
  };

  return (
    <nav className="site-nav" aria-label="Main navigation" data-animate="fade-down">
      <Link className="brand-mark" href="/" aria-label="Diligent Designs Consulting home" onClick={() => setIsOpen(false)}>
        <Image className="brand-logo" src="/ddc-favicon.png" alt="" width={256} height={256} priority unoptimized />
        <span className="brand-copy">Diligent Designs Consulting</span>
      </Link>

      <button
        className="nav-toggle"
        type="button"
        aria-controls="site-navigation-links"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>Menu</span>
        <i aria-hidden="true" />
      </button>

      <div className={`nav-actions ${isOpen ? "is-open" : ""}`} id="site-navigation-links">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(item.href) ? "page" : undefined}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link className="nav-cta" href={isScanner ? "/scanner/assessment" : "/scanner"} onClick={() => setIsOpen(false)}>
          {isScanner ? "Start Assessment" : "Run Scanner"}
        </Link>
      </div>
    </nav>
  );
}
