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
            <Link className="active" style={{ fontWeight: "bold", fontSize: 20 }} to="/dashboard"
                >Dashboard</Link>
            <Link style={{ fontWeight: "bold", fontSize: 20 }} to="/dashboard"
                onClick={() => setShowManage(!showManage)}>Manage Products</Link>
            {showManage ? (
                <>
                    <Link to="/category" >Add Category</Link>
                    <Link to="/subcategory" >Add Sub Category</Link>
                    <Link to="/product" >Add Product</Link>
                </>
            ) : null}
            <Link style={{ fontWeight: "bold", fontSize: 20 }} to="/users"
                >User Management</Link>
            <Link to="/" style={{ fontWeight: "bold", fontSize: 20, cursor: "pointer" }}
                onClick={handleLogout}>Logout</Link>

        </div>

    )
}

export default Sidebar;

