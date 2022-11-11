import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorize = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/");
    }
    return (
        <div className="container" style={{ textAlign: "center", marginTop: 150  }}>
            <h1 style={{ fontSize: 160 }}>403 </h1>
            <p className='fs-4 text-uppercase'>Forbidden Error</p>
            <p className='fs-4 text-uppercase'>You do not have permission to access this page</p>
            <button className='btn btn-primary' onClick={handleBack}>Back to Home</button>
        </div>
    )
}

export default Unauthorize;