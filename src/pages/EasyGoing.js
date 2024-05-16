import { Toast } from '@chakra-ui/react';
import EsayGoing from '../components/EasyGoing/EasyGoing';
import React from 'react';
import { ToastContainer } from 'react-toastify';
export default function EasyGoingPage() {
    return (
        <>
        <ToastContainer />
        <EsayGoing />
        </>
    )
}