import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { business } from '../data/business';
import LocationMap from '../components/LocationMap';

export default function About() {
  useEffect(() => {
    document.title = 'About The Rive Spa – Premium Wellness Center in Gomti Nagar, Lucknow';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Learn about The Rive Spa — a premium wellness destination in Gomti Nagar, Lucknow with experienced therapists, private rooms and thoughtful massage therapies.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `${business.domain}/about`);
  }, []);

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>›</span><span>About</span>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-story">
            <h1>About The Rive Spa</h1>
            <p>The Rive Spa was born from a simple belief: that everyone deserves a space to pause, breathe, and restore. Nestled in Gomti Nagar, Lucknow, we created a wellness destination where thoughtful care meets skilled practice. Our philosophy is rooted in the idea that true relaxation is not a luxury — it is a necessity for modern life.</p>
            <p>From the moment you step through our doors, every detail is designed with intention. The soft lighting, the natural aromas, the quiet privacy of our treatment rooms — all work together to create an environment where your body and mind can genuinely unwind. We believe wellness is personal, which is why every session is tailored to your needs, your comfort, and your pace.</p>
            <p>Located in the vibrant neighbourhood of Vivek Khand, we are proud to serve the Lucknow community with therapies that honour both traditional healing wisdom and contemporary wellness standards. Whether you visit us for a quick head massage or our signature 120-minute Cloud Therapy, you will experience the same commitment to quality, hygiene, and genuine care.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <h2>Our Promise</h2>
            <p>Three principles that guide everything we do.</p>
          </div>
          <div className="about-values">
            <div className="card about-value-card">
              <h3>Expertise</h3>
              <p>Every therapist on our team brings certified training and years of hands-on experience across multiple massage traditions. We invest in continuous learning to ensure our techniques remain refined and effective.</p>
            </div>
            <div className="card about-value-card">
              <h3>Hygiene</h3>
              <p>Cleanliness is non-negotiable. Every room is thoroughly sanitized between sessions. Fresh linen, sterilised tools, and premium products are standard — never an afterthought.</p>
            </div>
            <div className="card about-value-card">
              <h3>Serenity</h3>
              <p>From the ambient music to the private treatment rooms, every element of our space is designed to support your relaxation. We create an atmosphere where stress simply cannot follow you inside.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-story">
            <h2>Our Therapists</h2>
            <p>The heart of The Rive Spa is our team of dedicated therapists. Each member of our team holds professional certification in massage therapy and brings a minimum of three years of hands-on experience. They are trained across multiple traditions — from Swedish and deep tissue to Balinese, Thai, and aromatherapy techniques — allowing them to adapt each session to your individual needs.</p>
            <p>What sets our therapists apart is their genuine commitment to guest comfort. They listen carefully, communicate clearly about pressure and technique, and create a space where you feel completely at ease. Their skill is matched by their warmth — because we believe that great therapy is as much about how you feel as what is done.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading"><h2>Visit Us</h2></div>
          <div className="location-split">
            <LocationMap height="460px" />
            <div className="location-details">
              <h3>Location &amp; Hours</h3>
              <ul className="location-info">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{business.addressShort}</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  <a href={`tel:${business.phoneTel}`}>{business.phoneDisplay}</a>
                </li>
              </ul>
              <h3>Opening Hours</h3>
              <table className="hours-table">
                <tbody>
                  {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => (
                    <tr key={day}><td>{day}</td><td>11:00 AM – 8:00 PM</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h3>Ready to experience the difference?</h3>
            <p>Book your session today and discover why guests across Lucknow choose The Rive Spa.</p>
            <div className="cta-banner-buttons">
              <a href={business.waLink()} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" onClick={() => { window.dataLayer.push({ event: 'whatsapp_click', button_location: 'about-cta', page_url: window.location.href }); }}>Book on WhatsApp</a>
              <Link to="/services" className="btn btn-secondary">Explore Our Therapies</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
