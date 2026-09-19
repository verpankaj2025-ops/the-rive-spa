import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug, getRelatedServices } from '../data/services';
import { business } from '../data/business';
import LocationMap from '../components/LocationMap';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const relatedRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!service) return;
    document.title = service.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', service.metaDescription);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `${business.domain}/services/${service.slug}`);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'service_view', service_name: service.name, service_price: service.price });

    const existingScript = document.getElementById('service-jsonld');
    if (existingScript) existingScript.remove();
    const serviceData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": service.name,
          "description": service.intro,
          "provider": {
            "@type": "LocalBusiness",
            "name": business.name,
            "url": business.domain,
            "telephone": business.phone,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2/463, opp. Sun Motors Showroom, Vivek Khand 2",
              "addressLocality": "Lucknow",
              "addressRegion": "Uttar Pradesh",
              "postalCode": "226010",
              "addressCountry": "IN"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": business.latitude, "longitude": business.longitude }
          },
          "areaServed": { "@type": "City", "name": "Lucknow" },
          "offers": { "@type": "Offer", "price": service.priceNum.toString(), "priceCurrency": "INR", "url": `${business.domain}/services/${service.slug}` },
          "image": service.image,
          "url": `${business.domain}/services/${service.slug}`
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${business.domain}/` },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${business.domain}/services` },
            { "@type": "ListItem", "position": 3, "name": service.name, "item": `${business.domain}/services/${service.slug}` }
          ]
        }
      ]
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'service-jsonld';
    script.textContent = JSON.stringify(serviceData);
    document.head.appendChild(script);

    const milestones = [25, 50, 75, 100];
    const reached = new Set<number>();
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      milestones.forEach(m => {
        if (scrollPercent >= m && !reached.has(m)) {
          reached.add(m);
          window.dataLayer.push({ event: 'scroll_depth', depth: m });
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); const s = document.getElementById('service-jsonld'); if (s) s.remove(); };
  }, [service]);

  const trackWhatsApp = (location: string) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'whatsapp_click', button_location: location, page_url: window.location.href });
  };

  if (!service) {
    return (
      <div className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h1>Service Not Found</h1>
          <p>The service you are looking for does not exist.</p>
          <Link to="/services" className="btn btn-primary">View All Services</Link>
        </div>
      </div>
    );
  }

  const relatedServices = getRelatedServices(service.relatedSlugs);
  const waMessage = encodeURIComponent(`Hi, I'd like to book a ${service.name} at The Rive Spa`);
  const waLink = `https://wa.me/${business.whatsappNumber}?text=${waMessage}`;

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>›</span>
          <Link to="/services">Services</Link><span>›</span>
          <span>{service.name}</span>
        </nav>
      </div>

      <section className="service-hero">
        <div className="container">
          <div className="service-hero-grid">
            <div>
              <h1>{service.h1}</h1>
              <p style={{ color: 'var(--grey-mid)', fontSize: '1.05rem' }}>{service.intro}</p>
              <div className="service-meta-box">
                <div className="service-meta-item">
                  <span className="service-meta-label">Duration</span>
                  <span className="service-meta-value">{service.duration}</span>
                </div>
                <div className="service-meta-item">
                  <span className="service-meta-label">Price</span>
                  <span className="service-meta-value">{service.price}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a href={waLink} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('service-hero')}>Book on WhatsApp</a>
                <a href={`tel:${business.phoneTel}`} className="btn btn-secondary" onClick={() => { window.dataLayer.push({ event: 'call_click', page_url: window.location.href }); }}>Call to Book</a>
              </div>
            </div>
            <div className="service-hero-image">
              <img src={service.image} alt={service.imageAlt} width="800" height="600" loading="eager" fetchPriority="high" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="container service-prose">
          <h2>About This Therapy</h2>
          <div dangerouslySetInnerHTML={{ __html: service.whatItIs.replace(/\n\n/g, '</p><p>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </div>
      </section>

      <section className="service-section section-alt">
        <div className="container service-prose">
          <h2>Who This Therapy Is For</h2>
          <ul>
            {service.whoItsFor.map((item, i) => (
              <li key={i}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-section">
        <div className="container service-prose">
          <h2>The Experience</h2>
          <p>{service.theExperience}</p>
        </div>
      </section>

      <section className="service-section section-alt">
        <div className="container service-prose">
          <h2>What to Expect</h2>
          <p>{service.whatToExpect}</p>
        </div>
      </section>

      <section className="service-section">
        <div className="container service-prose">
          <h2>Preparation Guidance</h2>
          <ul>
            {service.preparation.map((item, i) => (
              <li key={i}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-section section-alt">
        <div className="container service-prose">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {service.faqs.map((faq, i) => (
              <details key={i} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="container">
          <div className="service-cta-section">
            <h3>Ready to experience {service.name}?</h3>
            <p style={{ color: 'var(--grey-mid)' }}>Book your session at The Rive Spa, Gomti Nagar, Lucknow.</p>
            <div className="service-cta-buttons">
              <a href={waLink} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp('service-cta')}>Book on WhatsApp</a>
              <a href={`tel:${business.phoneTel}`} className="btn btn-secondary" onClick={() => { window.dataLayer.push({ event: 'call_click', page_url: window.location.href }); }}>Call {business.phoneDisplay}</a>
              <Link to="/contact" className="btn btn-secondary">Booking Form</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section section-alt">
        <div className="container">
          <h2 style={{ textAlign: 'center' }}>Related Therapies</h2>
          <div className="related-services">
            {relatedServices.map((related, index) => (
              <div key={related.slug} className="card service-card" ref={el => { relatedRef.current[index] = el; }}>
                <Link to={`/services/${related.slug}`}>
                  <h3>{related.name}</h3>
                  <p className="service-card-desc">{related.shortDescription}</p>
                  <div className="service-card-meta">
                    <span className="service-card-duration">{related.duration}</span>
                    <span className="service-card-price">{related.price}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/services" className="btn btn-secondary">Explore All 12 Therapies →</Link>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="container">
          <div className="location-split">
            <LocationMap height="460px" />
            <div className="location-details">
              <h3>Find Us in Gomti Nagar</h3>
              <p>The Rive Spa is located at 2/463, opposite Sun Motors Showroom in Vivek Khand 2, Gomti Nagar. Easily accessible from across Lucknow with convenient parking nearby.</p>
              <ul className="location-info">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{business.addressShort}</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>{business.hours}</span>
                </li>
              </ul>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                <Link to="/about" className="btn btn-secondary">About The Rive Spa</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
