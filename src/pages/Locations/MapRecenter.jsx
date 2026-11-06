import { useEffect } from 'react';
import { useMap } from 'react-leaflet'

export default function MapRecenter({selectedPlot}) {

  const map = useMap();

  useEffect(() => {
    if(selectedPlot && selectedPlot.lat && selectedPlot.lng){
      map.flyTo([selectedPlot.lat, selectedPlot.lng], 9, {
          duration: 1.2, 
        });
    }
  }, [selectedPlot, map]);

  return null;
}