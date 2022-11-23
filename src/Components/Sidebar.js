import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/manageProduct.css';
import HeaderLogo from '../images/Logo.PNG';


const Sidebar = () => {
    const [showManage, setShowManage] = useState(true);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        alert("Loging Out");
        navigate("/");
    }

    
    return (
        <div className="sidebar">
            <img src={HeaderLogo} alt="HeaderLogo" className='img-width' />
            <Link className="active fs-6 fw-bold" to="/dashboard"
                >Dashboard</Link>
            <Link className='fs-6 fw-bold' to="/dashboard"
                onClick={() => setShowManage(!showManage)}>Manage Products</Link>
            {showManage ? (
                <>
                    <Link to="/category" className='fs-6'>Add Category</Link>
                    <Link to="/subcategory" className='fs-6'>Add Sub Category</Link>
                    <Link to="/product" className='fs-6'>Add Product</Link>
                </>
            ) : null}
            <Link className='fs-6 fw-bold' to="/users"
                >User Management</Link>
            <Link className='fs-6 fw-bold' to="/banners"
                >Banner Management</Link>
            <Link className='fs-6 fw-bold' to="/promo"
                >Promocode Management</Link>
            <Link className='fs-6 fw-bold' to="/banners"
                >Menu Management</Link>
            <Link className='fs-6 fw-bold' to="/banners"
                >CMS Management</Link>
            <Link className='fs-6 fw-bold' to="/banners"
                >Payment Gateway</Link>
            <Link className='fs-6 fw-bold' to="/banners"
                >Reports</Link>
            <Link to="/" style={{ fontWeight: "bold", fontSize: 15, cursor: "pointer" }}
                onClick={handleLogout}>Logout</Link>

        </div>

    )
}

export default Sidebar;

