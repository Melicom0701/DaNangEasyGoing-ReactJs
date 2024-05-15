import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const createRoutineMachineLayer = (props) => {
  const coors = props.waypoints;
  
  const instance = L.Routing.control({
    position: 'topleft',
    waypoints: [
      L.latLng(coors[0].x, coors[0].y),
      L.latLng(coors[1].x, coors[1].y)
    ],
    lineOptions: {
      styles: [
        {
          color: '#757de8',
        },
      ],
    },
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;