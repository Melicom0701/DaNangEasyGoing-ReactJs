import React, { useEffect, useState } from 'react';
import { MapContainer, LayersControl, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Routing from './Routing';
import L from "leaflet";

const position = [16.067986, 108.212505];
const icon = L.icon({
    iconUrl: '/placeHolder.png',    
    iconSize: [38, 38]
});
const icon2 = L.icon({
    iconUrl: '/yrhyrh.png',
    iconSize: [38, 38]
});
const icon3 = L.icon({
    iconUrl: '/location.png',
    iconSize: [38, 38]
});

function ResetCenterView({ selectPosition, setLocate }) {
    const defaultPosition = [16.0736657, 108.1472941];
    const position = selectPosition ? selectPosition : defaultPosition;
    const map = useMap();

    useEffect(() => {
        if (selectPosition) {
            map.flyTo(position, map.getZoom());
            setLocate(selectPosition.lat, selectPosition.lon);
        }
    }, [selectPosition, map]);

    return null;
}

function LocationMarker({ setLocate }) {
    const [position, setPosition] = useState(null);
    const map = useMap();

    const handleClick = () => {
        map.locate();
    };

    map.on('locationfound', (e) => {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        setLocate(e.latlng.lat, e.latlng.lng);
    });

    return (
        <div>
            <div className="leaflet-top leaflet-right">
                <div className="leaflet-control">
                    <button onClick={handleClick} style={{ backgroundColor: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}>
                        Locate Me
                    </button>
                </div>
                {position !== null && (
                    <Marker position={position} icon={icon3}></Marker>
                )}
            </div>
        </div>
    );
}

export default function EasyGoingMap({ coordinates, waypoints, selectPosition, setLocate }) {
    const [map, setMap] = useState(null);
    const locationSelection = selectPosition ? [selectPosition.lat, selectPosition.lon] : position;

    useEffect(() => {
        if (map) {
            map.invalidateSize();
        }
    }, [map, waypoints]);

    return (
        <MapContainer 
            center={locationSelection} 
            zoom={13} 
            style={{ width: '100%', height: '100%', borderRadius: "30px" }} 
            whenCreated={setMap}
        >
            <LayersControl position="bottomright">
                <LayersControl.BaseLayer checked name="Map">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=1keTF1e0ieHUf4ObsB7a"
                    />
                </LayersControl.BaseLayer>
            </LayersControl>
            
            {coordinates.map((coordinate, index) => (
                <Marker key={index} position={[coordinate.x, coordinate.y]} icon={icon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            ))}
            <ResetCenterView selectPosition={selectPosition} setLocate={setLocate} />
            <LocationMarker setLocate={setLocate} />
            {waypoints.length > 0 && <Routing key={JSON.stringify(waypoints)} waypoints={waypoints} />}
        </MapContainer>
    );
}
