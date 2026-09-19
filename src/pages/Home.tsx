import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { business } from '../data/business';
import LocationMap from '../components/LocationMap';

export default function Home() {
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.title = 'Premium Spa & Wellness Center in Gomti Nagar, Lucknow | The Rive Spa';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Premium spa and wellness treatments in Gomti Nagar, Lucknow. Explore Swedish, Balinese, deep tissue, Thai, couple spa and aromatherapy therapies at The Rive Spa.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `${business.domain}/`);

    const milestones = [25, 50, 75, 100];
    const reached = new Set<number>();
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      milestones.forEach(m => {
        if (scrollPercent >= m && !reached.has(m)) {
          reached.add(m);
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'scroll_depth', depth: m });
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const name = entry.target.getAttribute('data-service-name');
          const price = entry.target.getAttribute('data-service-price');
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'service_view', service_name: name, service_price: price });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    serviceCardsRef.current.forEach(card => { if (card) observer.observe(card); });

    return () => { window.removeEventListener('scroll', handleScroll); observer.disconnect(); };
  }, []);

  const trackWhatsApp = (location: string) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'whatsapp_click', button_location: location, page_url: window.location.href });
  };

  const featuredServices = services.slice(0, 6);

  return (
    <>
      <section className="hero" aria-label="Welcome to The Rive Spa">
        <div className="container hero-inner">
          <div className="hero-content">
            <h1>Lucknow's Most Loved Spa &amp; Wellness Center</h1>
            <p className="hero-subtitle">Premium massage therapies in the heart of Gomti Nagar. Restore your body. Reclaim your calm.</p>
            <div className="hero-ctas">
              <a href={business.waLink()} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('hero')}>
                Book on WhatsApp
              </a>
              <Link to="/services" className="btn btn-secondary">Explore Services</Link>
            </div>
            <div className="hero-badges">
              <span className="hero-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                200+ Happy Clients
              </span>
              <span className="hero-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Gomti Nagar, Lucknow
              </span>
              <span className="hero-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {business.hours}
              </span>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=1000&fit=crop" alt="Serene spa treatment room with warm lighting and massage table at The Rive Spa" width="800" height="1000" loading="eager" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="section" aria-label="Why choose The Rive Spa">
        <div className="container">
          <div className="section-heading">
            <h2>Why Guests Choose The Rive Spa</h2>
            <p>A wellness experience built on expertise, care, and attention to every detail.</p>
          </div>
          <div className="why-grid">
            <div className="card why-card">
              <svg className="why-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 3a3 3 0 11-3 3 3 3 0 013-3zm0 14.2a7.2 7.2 0 01-6-3.22c.034-1.976 4-3.06 6-3.06s5.966 1.084 6 3.06a7.2 7.2 0 01-6 3.22z"/></svg>
              <h3>Expert Therapists</h3>
              <p>Certified professionals, 3+ years experience</p>
            </div>
            <div className="card why-card">
              <svg className="why-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              <h3>Hygiene First</h3>
              <p>Sanitized rooms, fresh linen every session</p>
            </div>
            <div className="card why-card">
              <svg className="why-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446A9 9 0 1112 3z"/></svg>
              <h3>Premium Oils</h3>
              <p>Natural oils and refined aromatherapy blends</p>
            </div>
            <div className="card why-card">
              <svg className="why-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              <h3>Private Rooms</h3>
              <p>Complete privacy, serene ambiance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-label="Featured spa therapies">
        <div className="container">
          <div className="section-heading">
            <h2>Therapies Crafted for Deep Restoration</h2>
            <p>Each treatment is designed with intention — combining skilled technique, premium products, and a calm environment.</p>
          </div>
          <div className="services-grid">
            {featuredServices.map((service, index) => (
              <div key={service.slug} className="card service-card" ref={el => { serviceCardsRef.current[index] = el; }} data-service-name={service.name} data-service-price={service.price}>
                <Link to={`/services/${service.slug}`}>
                  <div className="service-card-image">
                    <img src={service.image} alt={service.imageAlt} width="800" height="500" loading="lazy" />
                  </div>
                  <h3>{service.name}</h3>
                  <p className="service-card-desc">{service.shortDescription}</p>
                  <div className="service-card-meta">
                    <span className="service-card-duration">{service.duration}</span>
                    <span className="service-card-price">{service.price}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/services" className="btn btn-secondary">View All 12 Therapies →</Link>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Guest testimonials">
        <div className="container">
          <div className="section-heading">
            <h2>What Our Guests Say</h2>
            <p>Trusted by guests across Lucknow</p>
          </div>
          <div className="testimonials-grid">
            <div className="card testimonial-card">
              <p className="testimonial-text">"The best spa experience in Gomti Nagar. The therapists are incredibly skilled and the ambiance is so calming. I always leave feeling completely renewed."</p>
              <div className="testimonial-author">Priya S.</div>
              <div className="testimonial-source">Gomti Nagar, Lucknow</div>
            </div>
            <div className="card testimonial-card">
              <p className="testimonial-text">"My wife and I tried the couple spa package for our anniversary. The private suite, the attention to detail, and the quality of the massage were outstanding."</p>
              <div className="testimonial-author">Rahul M.</div>
              <div className="testimonial-source">Lucknow</div>
            </div>
            <div className="card testimonial-card">
              <p className="testimonial-text">"I've been to many spas in Lucknow but The Rive Spa stands apart. The Balinese massage was divine. Clean, professional, and genuinely relaxing."</p>
              <div className="testimonial-author">Ananya K.</div>
              <div className="testimonial-source">Gomti Nagar, Lucknow</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" aria-label="Location and booking">
        <div className="container">
          <div className="section-heading">
            <h2>Visit The Rive Spa</h2>
            <p>Located in the heart of Gomti Nagar, Lucknow. Walk-ins welcome subject to availability.</p>
          </div>
          <div className="location-split">
            <LocationMap height="460px" />
            <div className="location-details">
              <h3>Get in Touch</h3>
              <ul className="location-info">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{business.addressShort}</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>{business.hours}</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  <a href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </li>
              </ul>
              <div className="location-ctas">
                <a href={business.waLink()} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('location')}>Book via WhatsApp</a>
                <a href={`tel:${business.phoneTel}`} className="btn btn-secondary" onClick={() => { window.dataLayer.push({ event: 'call_click', page_url: window.location.href }); }}>Call to Book</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Frequently asked questions">
        <div className="container">
          <div className="section-heading">
            <h2>Common Questions</h2>
          </div>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Do I need to book in advance?</summary>
              <p>We recommend booking in advance, especially for weekends and evenings. Walk-ins are welcome subject to availability, but booking ensures your preferred time slot and therapist.</p>
            </details>
            <details className="faq-item">
              <summary>What should I wear to my spa session?</summary>
              <p>For most massage therapies, you will be provided with comfortable attire. For Thai massage, you remain fully clothed. Your therapist will guide you through the process.</p>
            </details>
            <details className="faq-item">
              <summary>Are your therapists certified?</summary>
              <p>Yes, all our therapists are certified professionals with a minimum of 3 years hands-on experience across multiple massage traditions.</p>
            </details>
            <details className="faq-item">
              <summary>What are your opening hours?</summary>
              <p>We are open Monday through Sunday, 11:00 AM to 8:00 PM. We welcome guests every day of the week.</p>
            </details>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/contact#faq" className="btn btn-secondary">See all FAQs →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
