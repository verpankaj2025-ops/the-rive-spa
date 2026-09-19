export const business = {
  name: 'The Rive Spa',
  tagline: 'Where Stress Dissolves',
  domain: 'https://www.thecloudspa.in',
  email: 'hello@thecloudspa.in',
  phone: '+91-8303720883',
  phoneDisplay: '+91-8303720883',
  phoneTel: '+918303720883',
  whatsappNumber: '918303720883',
  address: '2/463, opp. Sun Motors Showroom, Vivek Khand 2, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
  addressShort: '2/463, opp. Sun Motors Showroom, Vivek Khand 2, Gomti Nagar, Lucknow, UP 226010',
  addressLines: [
    '2/463, opp. Sun Motors Showroom,',
    'Vivek Khand 2,',
    'Gomti Nagar,',
    'Lucknow,',
    'Uttar Pradesh 226010'
  ],
  postalCode: '226010',
  locality: 'Lucknow',
  region: 'Uttar Pradesh',
  country: 'IN',
  latitude: '26.8575924',
  longitude: '81.0006776',
  plusCode: 'V252+27 Lucknow, Uttar Pradesh',
  mapsBusinessUrl: 'https://maps.app.goo.gl/8aSYiQzC11nEsf598',
  mapsCoordinateUrl: 'https://www.google.com/maps/search/?api=1&query=26.8575924%2C81.0006776',
  hours: 'Monday–Sunday, 11:00 AM – 8:00 PM',
  hoursSchema: 'Mo-Su 11:00-20:00',
  priceRange: '₹1,499 – ₹5,999',
  waLink: (message?: string) => {
    const base = 'https://wa.me/918303720883';
    if (message) return `${base}?text=${encodeURIComponent(message)}`;
    return `${base}?text=${encodeURIComponent("Hi, I'd like to book a spa session at The Rive Spa")}`;
  }
};

export const trackingConfig = {
  GTM_ID: 'GTM-XXXXXXX',
  GA4_ID: 'G-XXXXXXXXXX',
  ADS_ID: 'AW-XXXXXXXXXX',
  META_PIXEL_ID: 'META-PIXEL-ID'
};
