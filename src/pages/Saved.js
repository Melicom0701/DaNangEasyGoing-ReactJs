import Saved from '../components/Saved/Saved';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function SavedPage() {
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
        <Saved />
        </>
    )
}
