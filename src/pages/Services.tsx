import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { business } from '../data/business';
import LocationMap from '../components/LocationMap';

export default function Services() {
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    document.title = 'Spa Services & Therapies in Lucknow | The Rive Spa – Gomti Nagar';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Explore 12 premium spa treatments at The Rive Spa, Gomti Nagar Lucknow. Swedish, Balinese, Couple Spa, Hot Stone, Thai, Body Scrub & more.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `${business.domain}/services`);

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
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>›</span><span>Services</span>
        </nav>
      </div>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto 3rem', textAlign: 'center' }}>
            <h1>Spa Services &amp; Therapies in Gomti Nagar, Lucknow</h1>
            <p style={{ color: 'var(--grey-mid)' }}>At The Rive Spa, we offer twelve carefully designed therapies — each addressing different needs, from gentle relaxation to targeted muscle relief. Whether you are seeking your first spa experience or a regular wellness ritual, our range ensures there is a treatment suited to your body and your moment.</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
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
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <h2>Quick Comparison</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table">
              <thead>
                <tr><th>Therapy</th><th>Duration</th><th>Price</th><th>Best For</th></tr>
              </thead>
              <tbody>
                {services.map(s => (
                  <tr key={s.slug}>
                    <td><Link to={`/services/${s.slug}`}>{s.name}</Link></td>
                    <td>{s.duration}</td>
                    <td>{s.price}</td>
                    <td>{s.shortDescription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h3>Not sure which therapy is right for you?</h3>
            <p>Ask our experts on WhatsApp. We will help you find the perfect treatment for your needs.</p>
            <div className="cta-banner-buttons">
              <a href={business.waLink('Hi, I\'d like help choosing a spa treatment at The Rive Spa')} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" onClick={() => { window.dataLayer.push({ event: 'whatsapp_click', button_location: 'services-cta', page_url: window.location.href }); }}>Ask on WhatsApp</a>
              <Link to="/contact" className="btn btn-secondary">View Contact Details</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="location-split">
            <LocationMap height="460px" />
            <div className="location-details">
              <h3>Visit Our Spa</h3>
              <p>The Rive Spa is conveniently located in Gomti Nagar, one of Lucknow's most accessible neighbourhoods. Whether you are coming from Hazratganj, Aminabad, or the outer ring road, our spa is easy to find — just opposite Sun Motors Showroom in Vivek Khand 2.</p>
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
              <Link to="/contact" className="btn btn-primary">Get Directions &amp; Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
