import React from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useQuery } from 'react-query';
//API Calls
import { fetchNearbyPlaces } from './api';
// Map Settings
import { containerStyle, center, options } from './settings';
// Styles
import { Wrapper, LoadingView } from './App.styles';

export type MarkerType = {
  id: string;
  location: google.maps.LatLngLiteral;
  name: string;
  phone_number: string;
  website: string;
}

const App: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!
    
  })

  const mapRef = React.useRef<google.maps.Map<Element> | null>(null);

  const [clickedPos, setClickedPos] = React.useState<google.maps.LatLngLiteral>({} as google.maps.LatLngLiteral)

  const {
    data: nearbyPositions,
    isLoading,
    isError
  } = useQuery([clickedPos.lat, clickedPos.lng], () => fetchNearbyPlaces(clickedPos.lat, clickedPos.lng), {
    enabled: !!clickedPos.lat,
    refetchOnWindowFocus: false
  });

  const onLoad = (map: google.maps.Map<Element>): void => {
    mapRef.current = map;
  }

  const onUnMount = (): void => {
    mapRef.current = null;
  }

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    setClickedPos({ lat: e.latLng.lat(), lng: e.latLng.lng() })
  }

  if (!isLoaded) return<div>Map loading </div>;

  return (
    <Wrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={options as google.maps.MapOptions}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnMount}
        onClick={onMapClick}      
        >

          {}
      </GoogleMap>
    </Wrapper>
  );
};

export default App;
