import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import EasyGoingMap from '../Maps/EasyGoingMap';
import Search from './Search';
import CardItem from './CardItem';
import Travel from './Travel'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getItems = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return [];
    }
    


    const response = await fetch(process.env.REACT_APP_ENDPOINT + "destination/saved");
    const data = await response.json();
    console.log(data);
    return data;

}





const EasyGoing = () => {
    const [coordinates, setCoordinates] = useState([
        { x: 16.067986, y: 108.212505 },
        { x: 16.077986, y: 108.222505 },
        { x: 16.068986, y: 108.211505 }
    ]);

    const [waypoints, setWaypoints] = useState([]);

    const [currentLocation, setCurrentLocation] = useState();
    const [destinationLocations, setDestinationLocations] = useState([]);

    const setLocate = (lat, lon) => {
        setCurrentLocation({ x: lat, y: lon });
    }
    const setDesCoordinates = (lat,lon) => {
        setDestinationLocations( {x:lat, y:lon});   

    }


    useEffect(() => {
        console.log(currentLocation);
        console.log(destinationLocations);
        if (!currentLocation) 
            {   
                // toast.warn("Định vị để được dẫn đường đến quán");
                return;
            }
        else 
        setWaypoints([
            { x: currentLocation.x, y: currentLocation.y },
            { x: destinationLocations.x, y: destinationLocations.y }
        
        ]);
    }, [currentLocation,destinationLocations]);

    return (
        <>

        <Flex>

            <Box w="730px" style={{position:"fixed",height: "100vh"}} >
                <EasyGoingMap 
                    coordinates={coordinates} 
                    waypoints={waypoints} 
                    setLocate={setLocate} 
                />
            </Box>
            <Box w="730px" style={{height: "100vh"}}>
            </Box>
          

            <Box>

                <Travel style={{width:"1000px"}} setLocate={setDesCoordinates}/>
            </Box>
        </Flex>
        </>
    );
};

export default EasyGoing;
