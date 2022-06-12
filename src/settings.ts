// Settings for the map goes inside this file
import mapStyles from './mapStyles';

export const containerStyle = {
  width: '100%',
  height: '100vh'
};

// Center on Portland 45.50523447848519, -122.5831886907679
export const center = {
  lat: 45.50523447848519,
  lng: -122.5831886907679
};

// Disable default UI
export const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
};
