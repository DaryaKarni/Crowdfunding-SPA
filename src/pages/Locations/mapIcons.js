import L from 'leaflet';

export const defaultMarkerIcon = L.divIcon({
  className: 'custom-map-pin',
  html: `
    <svg width="30" height="38" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.71573 0 0 6.71573 0 15C0 26.25 15 38 15 38C15 38 30 26.25 30 15C30 6.71573 23.2843 0 15 0Z" fill="#111111"/>
      <circle cx="15" cy="15" r="5" fill="#FFFFFF"/>
    </svg>
  `,
  iconSize: [30, 38],
  iconAnchor: [15, 38],
  popupAnchor: [0, -36],
});

export const selectedMarkerIcon = L.divIcon({
  className: 'custom-map-pin custom-map-pin--active',
  html: `
    <svg width="36" height="46" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.71573 0 0 6.71573 0 15C0 26.25 15 38 15 38C15 38 30 26.25 30 15C30 6.71573 23.2843 0 15 0Z" fill="#55a630"/>
      <circle cx="15" cy="15" r="5" fill="#FFFFFF"/>
    </svg>
  `,
  iconSize: [36, 46],
  iconAnchor: [18, 46],
  popupAnchor: [0, -42],
});