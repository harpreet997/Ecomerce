import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/");
    }
    return (
        <div className="container" style={{ textAlign: "center", marginTop: 150 }}>
            <h1 style={{ fontSize: 160 }}>404 </h1>
            <p className='fs-4 text-uppercase'>Page Not Found</p>
            <button className='btn btn-primary' onClick={handleBack}>Back to Home</button>
        </div>
    )
}

export default PageNotFound;