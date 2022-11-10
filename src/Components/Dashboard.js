import React from 'react';
import '../styles/manageProduct.css';
import Sidebar from './Sidebar';
import OrdersLogo from '../images/Order.PNG';
import IncomeLogo from '../images/Income.PNG';
import ExpenseLogo from '../images/Expense.PNG';
import { MdShoppingBag } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';

const Dashboard = () => {
    return (
        <>
            <Sidebar />
            <div className="content">
                <div className="row mt-4 mb-4">
                    <div className="col-md-10 col-lg-11">
                        <input className="w-100 ps-3 search-input" type="text" name="Search" placeholder='Search Products...'
                        />
                        <BsSearch className='search-icon' />
                    </div>
                    <div className="col-md-2 col-lg-1">
                        <MdShoppingBag style={{ width: 50, height: 40 }} />
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h3>Product Details</h3>
                        <div className="row mt-5">
                            <div className="col-md-4">
                                <div className='card'>
                                    <div className="card-body">
                                        <p className="fw-bold text-secondary">New Orders</p>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <img src={OrdersLogo} alt="OrderLogo" style={{ width: 100, height: 80 }} />

                                            </div>
                                            <div className="col-lg-6">
                                                <p className="fs-1 fw-bold">&#8377; 345</p>
                                                <p className="fw-bold text-secondary ms-2">50% (30 days)</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='card'>
                                    <div className="card-body">
                                        <p className="fw-bold text-secondary">Total Income</p>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <img src={IncomeLogo} alt="OrderLogo" style={{ width: 100, height: 80 }} />

                                            </div>
                                            <div className="col-lg-6">
                                                <p className="fs-1 fw-bold">&#8377; 75.0</p>
                                                <p className="fw-bold text-secondary ms-2">50% (30 days)</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='card'>
                                    <div className="card-body">
                                        <p className="fw-bold text-secondary">Total Expense</p>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <img src={ExpenseLogo} alt="OrderLogo" style={{ width: 100, height: 80 }} />

                                            </div>
                                            <div className="col-lg-6">
                                                <p className="fs-1 fw-bold">&#8377; 50.2</p>
                                                <p className="fw-bold text-secondary ms-2">50% (30 days)</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
