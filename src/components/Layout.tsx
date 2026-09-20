import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { business } from '../data/business';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stickyBarVisible, setStickyBarVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setStickyBarVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const trackWhatsApp = (buttonLocation: string) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_click',
      button_location: buttonLocation,
      page_url: window.location.href
    });
  };

  const trackCall = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'call_click',
      page_url: window.location.href
    });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`} role="banner">
        <div className="container header-inner">
          <div className="header-brand">
            <Link to="/" className="header-brand-name">{business.name}</Link>
            <span className="header-brand-tagline">{business.tagline}</span>
          </div>
          <nav className="header-nav" aria-label="Main navigation">
            <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
            <Link to="/services" className={isActive('/services') ? 'active' : ''}>Services</Link>
            <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
            <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
            <a
              href={business.waLink()}
              className="btn btn-primary header-cta"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsApp('header')}
            >
              Book Now
            </a>
          </nav>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        id="mobile-nav"
        className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <button
          className="mobile-nav-close"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <nav aria-label="Mobile navigation links">
          <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
          <Link to="/services" className={isActive('/services') ? 'active' : ''}>Services</Link>
          <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
          <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
        </nav>
        <a
          href={business.waLink()}
          className="btn btn-whatsapp"
          style={{ marginTop: '24px', textAlign: 'center' }}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsApp('mobile-nav')}
        >
          Book on WhatsApp
        </a>
      </div>

      {/* Main Content */}
      <main id="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-brand-name">{business.name}</div>
              <div className="footer-brand-tagline">{business.tagline}</div>
              <p>Premium spa and wellness center in Gomti Nagar, Lucknow. Restoring body and mind through thoughtful massage therapies.</p>
              <div className="footer-social">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href={business.mapsBusinessUrl} target="_blank" rel="noopener noreferrer" aria-label="Find us on Google Maps">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4>Services</h4>
              <ul className="footer-links">
                <li><Link to="/services/swedish-massage">Swedish Massage</Link></li>
                <li><Link to="/services/deep-tissue-massage">Deep Tissue</Link></li>
                <li><Link to="/services/balinese-massage">Balinese Massage</Link></li>
                <li><Link to="/services/thai-massage">Thai Massage</Link></li>
                <li><Link to="/services/hot-stone-massage">Hot Stone</Link></li>
                <li><Link to="/services/couple-spa">Couple Spa</Link></li>
                <li><Link to="/services/aromatherapy">Aromatherapy</Link></li>
                <li><Link to="/services/foot-reflexology">Foot Reflexology</Link></li>
                <li><Link to="/services/body-scrub-wrap">Body Scrub & Wrap</Link></li>
                <li><Link to="/services/signature-cloud-therapy">Cloud Therapy</Link></li>
                <li><Link to="/services/head-scalp-massage">Head & Scalp</Link></li>
                <li><Link to="/services/prenatal-massage">Prenatal Massage</Link></li>
              </ul>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/contact#faq">FAQs</Link></li>
                <li><Link to="/contact#privacy">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{business.addressShort}</span>
              </div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                <a href={`tel:${business.phoneTel}`} onClick={trackCall}>{business.phoneDisplay}</a>
              </div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>{business.email}</span>
              </div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{business.hours}</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {business.name}. Designed for wellness.</span>
            <span>{business.domain.replace('https://', '')}</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href={business.waLink()}
        className="whatsapp-fab"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onClick={() => trackWhatsApp('fab')}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 1.7 2.598 4.122 3.645.579.25 1.032.4 1.386.512.583.185 1.112.159 1.528.097.467-.07 1.435-.587 1.64-1.161.204-.574.204-1.066.142-1.169-.06-.102-.223-.159-.52-.308zM12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Mobile Sticky Bar */}
      <div className={`mobile-sticky-bar ${stickyBarVisible ? 'visible' : ''}`}>
        <span className="mobile-sticky-bar-text">{business.name} · Gomti Nagar</span>
        <a
          href={business.waLink()}
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsApp('mobile-sticky')}
        >
          Book Now
        </a>
      </div>
    </>
  );
}
