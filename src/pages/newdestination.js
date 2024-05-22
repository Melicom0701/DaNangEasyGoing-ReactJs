import NewDestination from '../components/Destination/NewDestination';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function NewDestinationPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            navigate('/login');
           
        }
    }, [token, navigate]
    )

    return (
        <NewDestination />
    )
}