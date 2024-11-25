import React from 'react';
import { Link, Navigate } from "react-router-dom";
import PageNotFound from "../Pages/PageNotFound";

const ProtectedRoutes = ({ children, shelterOnly = false, userOnly = false }) => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (shelterOnly && role !== "shelter") {
        return <PageNotFound />;
    }

    if (userOnly && role !== "adopter") {
        return <PageNotFound />;
    }
    return children;
};

export default ProtectedRoutes;
