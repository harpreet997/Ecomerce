import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
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
            <NavLink className="fs-6 fw-bold" to="/dashboard"
            >Dashboard</NavLink>
            <NavLink className='fs-6 fw-bold' to="/manage-product"
                onClick={() => setShowManage(!showManage)}>Manage Products</NavLink>
            {showManage ? (
                <>
                    <NavLink to="/category" className='fs-6'
                    >Add Category</NavLink>
                    <NavLink to="/subcategory" className='fs-6'
                    >Add Sub Category</NavLink>
                    <NavLink to="/product" className='fs-6'
                    >Add Product</NavLink>
                </>
            ) : null}
            <NavLink to="/users" activeClassName="menu-color" className='fs-6 fw-bold'
            >User Management</NavLink>
            <NavLink to="/banners" activeClassName="menu-color" className='fs-6 fw-bold'
            >Banner Management</NavLink>
            <NavLink to="/promo" className='fs-6 fw-bold'
            >Promocode Management</NavLink>
            <NavLink to="/menu" className='fs-6 fw-bold'
            >Menu Management</NavLink>
            <NavLink to="/footer" className='fs-6 fw-bold'
            >CMS Management</NavLink>
            <NavLink to="/payment" className='fs-6 fw-bold'
            >Payment Gateway</NavLink>
            <NavLink className='fs-6 fw-bold' to="/reports"
            >Reports</NavLink>
            <NavLink to="/" className='logout'
                onClick={handleLogout}>Logout</NavLink>

        </div>

    )
}

export default Sidebar;

