import { Toast } from '@chakra-ui/react';
import EsayGoing from '../components/EasyGoing/EasyGoing';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function EasyGoingPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
           
        }
    }, [token, navigate]
    )


    return (
        <>
        <ToastContainer />
        <EsayGoing />
        </>
    )
}