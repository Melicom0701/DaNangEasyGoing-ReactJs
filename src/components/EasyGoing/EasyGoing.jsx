import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import EasyGoingMap from '../Maps/EasyGoingMap';
import Search from './Search';

const EasyGoing = () => {
    const [coordinates, setCoordinates] = useState([
        { x: 16.067986, y: 108.212505 },
        { x: 16.077986, y: 108.222505 },
        { x: 16.068986, y: 108.211505 }
    ]);

    const [waypoints, setWaypoints] = useState([
        { x: 16.067986, y: 108.212505 },
        { x: 16.077986, y: 108.222505 }
    ]);

    const [currentLocation, setCurrentLocation] = useState();

    const setLocate = (lat, lon) => {
        setCurrentLocation({ x: lat, y: lon });
    }

    useEffect(() => {
        console.log(currentLocation);
        if (!currentLocation) return;
        else 
        setWaypoints([
            { x: currentLocation.x, y: currentLocation.y },
            { x: 16.077986, y: 108.222505 }
        ]);
    }, [currentLocation]);

    return (
        <Flex>
            <Box w="700px" style={{ height: "100vh" }}>
                <EasyGoingMap 
                    coordinates={coordinates} 
                    waypoints={waypoints} 
                    setLocate={setLocate} 
                />
            </Box>
            <Box>
                {/* <Search /> */}
            </Box>
        </Flex>
    );
};

export default EasyGoing;
