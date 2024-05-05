import Login from "../components/Login/Login"
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function DetailPage() {
    const navigate = useNavigate();
    const isLogin = localStorage.getItem('token');
    useEffect(() => {
        if (isLogin) {
            navigate("/");


        }
    },[isLogin]);



    return (
        <Login />
    )
}