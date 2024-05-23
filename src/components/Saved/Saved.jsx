import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import EasyGoingMap from '../Maps/EasyGoingMap';
import Travel from './Travel'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from '../SideBar/SideBar';




const EasyGoing = () => {
       

    return (
        <>

        <Flex
        backgroundColor="#e2e8f0"
        minHeight="100vh"

        >

            <Box position="fixed" p="20px">
            <SideBar _active="saved" />
            </Box>
            <Box width="280px"> 
            </Box>
            <Box p="16px" backgroundColor="white" m="30px" borderRadius="30px">

                <Travel />
            </Box>
        </Flex>
        </>
    );
};

export default EasyGoing;
