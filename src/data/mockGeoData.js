
export const geoDataById = {
  1: { lat: 51.5074, lng: -0.1278, city: 'London', region: 'Greater London', country: 'UK', plotArea: '14 ha' },
  2: { lat: 51.7520, lng: -1.2577, city: 'Oxford', region: 'Oxfordshire', country: 'UK', plotArea: '8 ha' },
  3: { lat: 52.2053, lng: 0.1218, city: 'Cambridge', region: 'Cambridgeshire', country: 'UK', plotArea: '22 ha' },
  4: { lat: 51.4545, lng: -2.5879, city: 'Bristol', region: 'South West', country: 'UK', plotArea: '5 ha' },
  5: { lat: 52.4862, lng: -1.8904, city: 'Birmingham', region: 'West Midlands', country: 'UK', plotArea: '18 ha' },
  6: { lat: 53.4808, lng: -2.2426, city: 'Manchester', region: 'North West', country: 'UK', plotArea: '30 ha' },
  7: { lat: 53.8008, lng: -1.5491, city: 'Leeds', region: 'Yorkshire', country: 'UK', plotArea: '11 ha' },
  8: { lat: 50.8225, lng: -0.1372, city: 'Brighton', region: 'East Sussex', country: 'UK', plotArea: '7 ha' },
  9: { lat: 51.3758, lng: -2.3599, city: 'Bath', region: 'Somerset', country: 'UK', plotArea: '16 ha' },
  10: { lat: 54.9783, lng: -1.6178, city: 'Newcastle', region: 'Tyne and Wear', country: 'UK', plotArea: '40 ha' },
  11: { lat: 50.7184, lng: -3.5339, city: 'Exeter', region: 'Devon', country: 'UK', plotArea: '19 ha' },
  12: { lat: 52.6309, lng: 1.2974, city: 'Norwich', region: 'Norfolk', country: 'UK', plotArea: '25 ha' },
  13: { lat: 53.4084, lng: -2.9916, city: 'Liverpool', region: 'Merseyside', country: 'UK', plotArea: '13 ha' },
  14: { lat: 52.9548, lng: -1.1581, city: 'Nottingham', region: 'East Midlands', country: 'UK', plotArea: '9 ha' },
  15: { lat: 53.9590, lng: -1.0815, city: 'York', region: 'North Yorkshire', country: 'UK', plotArea: '33 ha' },
  16: { lat: 51.2802, lng: 1.0789, city: 'Canterbury', region: 'Kent', country: 'UK', plotArea: '6 ha' },
  17: { lat: 50.3755, lng: -4.1427, city: 'Plymouth', region: 'Devon', country: 'UK', plotArea: '27 ha' },
  18: { lat: 51.8959, lng: -2.0785, city: 'Cheltenham', region: 'Gloucestershire', country: 'UK', plotArea: '15 ha' },
  19: { lat: 51.0632, lng: -1.3080, city: 'Winchester', region: 'Hampshire', country: 'UK', plotArea: '12 ha' },
  20: { lat: 52.0567, lng: 1.1482, city: 'Ipswich', region: 'Suffolk', country: 'UK', plotArea: '21 ha' }
};

export const getDefaultGeo = (id) => ({
  lat: 51.5074 + (id % 5) * 0.1,
  lng: -0.1278 + (id % 5) * 0.1,
  city: 'Greenfield',
  region: 'Eco Valley',
  country: 'UK',
  plotArea: '10 ha',
});