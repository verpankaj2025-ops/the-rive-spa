import { business } from '../data/business';

interface LocationMapProps {
  height?: string;
  className?: string;
  showAddress?: boolean;
  showOpenLink?: boolean;
}

export default function LocationMap({
  height = '460px',
  className = '',
  showAddress = true,
  showOpenLink = true
}: LocationMapProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const placeQuery = encodeURIComponent(business.plusCode);
  const center = `${business.latitude},${business.longitude}`;

  const embedUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${placeQuery}&center=${center}&zoom=18&maptype=roadmap`
    : '';

  const trackMapClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'location_map_click',
      page_url: window.location.href,
      button_location: 'map_link'
    });
  };

  return (
    <div className={`location-map-wrapper ${className}`}>
      <div className="location-map-frame" style={{ height }}>
        {apiKey ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            title="The Rive Spa location in Gomti Nagar, Lucknow"
          />
        ) : (
          <div className="location-map-fallback">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div className="location-map-fallback-info">
              <strong>{business.name}</strong>
              <span>{business.address}</span>
            </div>
            <a
              href={business.mapsBusinessUrl}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackMapClick}
            >
              Open in Google Maps
            </a>
            {import.meta.env.DEV && (
              <small className="location-map-dev-note">
                Interactive map requires the Google Maps API key.
              </small>
            )}
          </div>
        )}
      </div>

      {showAddress && (
        <div className="location-map-meta">
          <p className="location-map-address">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{business.address}</span>
          </p>
          {showOpenLink && (
            <a
              href={business.mapsBusinessUrl}
              className="location-map-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackMapClick}
            >
              Open in Google Maps
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
