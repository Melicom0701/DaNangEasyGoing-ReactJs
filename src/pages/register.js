import Register from '../components/Register/Register';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function RegisterPage() {
    const navigate = useNavigate();
    const isLogin = localStorage.getItem('token');
    useEffect(() => {
        if (isLogin) {
            navigate('/');
        }
    }, [isLogin]);
    return (
        <Register />
    );
}
