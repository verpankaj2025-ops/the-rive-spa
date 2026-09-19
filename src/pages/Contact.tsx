import { useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { business } from '../data/business';
import LocationMap from '../components/LocationMap';

export default function Contact() {
  const [formData, setFormData] = useState({ fullName: '', phone: '', service: '', date: '', time: '', guests: '1', message: '' });

  useEffect(() => {
    document.title = 'Contact & Book – The Rive Spa Gomti Nagar Lucknow | +91-8303720883';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Book a spa appointment at The Rive Spa, Gomti Nagar Lucknow. Call or WhatsApp +91-8303720883. Open daily 11am–8pm.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `${business.domain}/contact`);

    const existingFaqScript = document.getElementById('faq-jsonld');
    if (existingFaqScript) existingFaqScript.remove();
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": { "@type": "Answer", "text": item.answer }
      }))
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-jsonld';
    script.textContent = JSON.stringify(faqData);
    document.head.appendChild(script);
    return () => { const s = document.getElementById('faq-jsonld'); if (s) s.remove(); };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.service || !formData.date || !formData.time) {
      alert('Please fill in all required fields.');
      return;
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'form_submit', service_selected: formData.service, guest_count: formData.guests });
    window.dataLayer.push({ event: 'generate_lead', service_selected: formData.service, guest_count: formData.guests, page_url: window.location.href });
    const message = `Hi, I'd like to book a spa session at The Rive Spa.%0A%0A*Name:* ${encodeURIComponent(formData.fullName)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Service:* ${encodeURIComponent(formData.service)}%0A*Date:* ${encodeURIComponent(formData.date)}%0A*Time:* ${encodeURIComponent(formData.time)}%0A*Guests:* ${encodeURIComponent(formData.guests)}${formData.message ? '%0A*Message:* ' + encodeURIComponent(formData.message) : ''}`;
    window.open(`https://wa.me/${business.whatsappNumber}?text=${message}`, '_blank');
  };

  const faqItems = [
    { question: 'Do I need to book in advance?', answer: 'We recommend booking in advance, especially for weekends and evenings. Walk-ins are welcome subject to availability, but booking ensures your preferred time slot and therapist.' },
    { question: 'What should I wear to my spa session?', answer: 'For most massage therapies, you will be provided with comfortable attire. For Thai massage, you remain fully clothed. Your therapist will guide you through the process upon arrival.' },
    { question: 'Are your therapists certified?', answer: 'Yes, all our therapists are certified professionals with a minimum of 3 years hands-on experience across multiple massage traditions including Swedish, Balinese, Thai, and deep tissue.' },
    { question: 'What are your opening hours?', answer: 'We are open Monday through Sunday, 11:00 AM to 8:00 PM. We welcome guests every day of the week, including holidays.' },
    { question: 'Do you offer couple spa packages?', answer: 'Yes, our Couple Spa Package includes a private suite with side-by-side massage tables. Each person can choose their preferred therapy. It is popular for anniversaries and special occasions.' },
    { question: 'Is parking available?', answer: 'Yes, parking is available near our location in Vivek Khand 2, Gomti Nagar. Our spa is conveniently located opposite Sun Motors Showroom with easy access from the main road.' },
    { question: 'Can I cancel or reschedule my appointment?', answer: 'We understand plans change. Please contact us at least 4 hours before your scheduled appointment to reschedule. You can reach us via WhatsApp or phone.' },
    { question: 'What payment methods do you accept?', answer: 'We accept cash, UPI, and major credit/debit cards. Payment is collected after your session is complete.' }
  ];

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>›</span><span>Contact</span>
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Contact &amp; Book</h1>
          <p style={{ textAlign: 'center', color: 'var(--grey-mid)', maxWidth: '60ch', margin: '0 auto 3rem' }}>Ready to experience The Rive Spa? Reach out via WhatsApp for instant booking, or fill in the form below and we will confirm your appointment.</p>

          <div className="cta-banner" style={{ marginBottom: '3rem' }}>
            <h3>Quick Booking via WhatsApp</h3>
            <p>The fastest way to book. Message us directly and we will confirm your slot within minutes.</p>
            <a href={business.waLink()} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer" onClick={() => { window.dataLayer.push({ event: 'whatsapp_click', button_location: 'contact-cta', page_url: window.location.href }); }}>Chat on WhatsApp</a>
          </div>

          <div className="contact-grid">
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Get in Touch</h2>
              <ul className="location-info">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{business.address}</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  <a href={`tel:${business.phoneTel}`} onClick={() => { window.dataLayer.push({ event: 'call_click', page_url: window.location.href }); }}>{business.phoneDisplay}</a>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>{business.hours}</span>
                </li>
              </ul>
              <div style={{ marginTop: '24px' }}>
                <LocationMap height="320px" />
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Booking Inquiry</h2>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input type="text" id="fullName" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 XXXXXXXXXX" />
                </div>
                <div className="form-group">
                  <label htmlFor="service">Preferred Service *</label>
                  <select id="service" required value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                    <option value="">Select a service</option>
                    {services.map(s => (<option key={s.slug} value={s.name}>{s.name} — {s.duration} — {s.price}</option>))}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Preferred Date *</label>
                    <input type="date" id="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">Preferred Time *</label>
                    <select id="time" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}>
                      <option value="">Select time</option>
                      <option value="Morning 11–1">Morning 11–1</option>
                      <option value="Afternoon 1–5">Afternoon 1–5</option>
                      <option value="Evening 5–8">Evening 5–8</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="guests">Number of Guests *</label>
                  <select id="guests" required value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})}>
                    <option value="1">1 Guest</option>
                    <option value="2 Couple">2 — Couple</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message (optional)</label>
                  <textarea id="message" rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Any special requests..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Booking Request</button>
              </form>
              <div className="privacy-note" id="privacy">
                <strong>Privacy:</strong> This form sends your booking details directly to our WhatsApp for confirmation. We do not store your information on any server. By submitting, you consent to being contacted regarding your booking.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="faq">
        <div className="container">
          <div className="section-heading"><h2>Frequently Asked Questions</h2></div>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <details key={index} className="faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
