import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer ,useMap,useMapEvents} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from "leaflet"
const position = [16.0736657, 108.1472941]
const icon = L.icon({
    iconUrl : "./placeHolder.png",
    iconSize :[38,38]
    });
const icon2 = L.icon({
    iconUrl : "./yrhyrh.png",
    iconSize :[38,38]
    });
function ResetCenterView(props)
{
  const { selectPosition } = props;
  const position =  selectPosition?selectPosition: [16.0736657, 108.1472941];
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, map.getZoom());
    
  },[selectPosition]);

  return null;

}
function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  const handleClick = () => {
      map.locate();
  };

  map.on('locationfound', (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
  });

  return (
      <div>
          <div className="leaflet-top leaflet-right">
            <div className="leaflet-control">
                <button onClick={handleClick} style={{ backgroundColor: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}>Locate Me</button>
            </div>
            {position !== null && (
                <Marker position={position} icon={icon2}></Marker>
            )}
        </div>
      </div>
  );
}

export default function Maps(props) {
  const {selectPosition} = props;
  const locationSelection = selectPosition? [selectPosition.lat,selectPosition.lon]:position; 
  return (
    <MapContainer center={locationSelection} zoom={13} style={{width:'100%',height:'100%'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=1keTF1e0ieHUf4ObsB7a"
      />
      {locationSelection &&(
      <Marker position={locationSelection} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>)}
      <ResetCenterView  selectPosition={selectPosition}/>
      <LocationMarker />
    </MapContainer>

  )
}