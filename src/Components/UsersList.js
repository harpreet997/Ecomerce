import React, { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import '../styles/manageProduct.css';
import Sidebar from './Sidebar';
import { MdShoppingBag } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { getAllUsers } from '../getData/getdata';
import { addUser } from '../postData/postdata';
import { deleteUser } from '../postData/postdata';
import Pagination from './Pagination';
import EditUser from './EditUser';
import { headers } from '../Header';

const UsersList = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [userdata, setUserData] = useState(
        {
            name: "",
            email: "",
            mobile: "",
            password: ""
        }
    );
    const [userModal, setUserModal] = useState(false);
    const [edituserModal, setEditUserModal] = useState(false);
    const [searchProduct, setSearchProduct] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    var currentRecords = categoryList.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(categoryList.length / recordsPerPage)
    const [id, setId] = useState();

    const handleUser = () => setUserModal(true);
    const handleEditUser = (id) => setEditUserModal(id);

    useEffect(() => {
        getAllUsers(headers)
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleUserDetails = (event) => {
        setUserData({
            ...userdata,
            [event.target.name]: event.target.value
        })
    }

    const AddUser = (event) => {
        event.preventDefault();
        if (userdata.password.length < 6) {
            alert("Password length must be greater or equal to 6")
        }
        else {
            addUser(userdata)
                .then(() => {
                    alert("User added successfully");
                    window.location.reload(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const DeleteUser = (user_id) => {
        const payload = {
            id: user_id
        }

        deleteUser(payload, headers)
            .then(() => {
                alert("User deleted successfully");
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <Sidebar />

            <div className="content">
                <div className="row mt-4 mb-4">
                    <div className="col-md-10 col-lg-11">
                        <input className="w-100 ps-3 search-input" type="text" name="Search"
                            placeholder='Enter your Category Name'
                            onChange={(e) => setSearchProduct(e.target.value)} />
                        <BsSearch className='search-icon' />
                    </div>

                    <div className="col-md-2 col-lg-1">
                        <MdShoppingBag className="shopping-bag" style={{ width: 50, height: 40 }} />
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xs-6 col-md-9 col-lg-10">
                                <h4>Users List</h4>

                            </div>
                            <div className="col-xs-6 col-md-3 col-lg-2">
                                <Button style={{ marginLeft: 0, backgroundColor: "orange", fontWeight: "bold" }} onClick={handleUser}
                                    className="border border-warning w-100 py-2 fs-5"
                                >ADD MORE</Button>
                                <Modal show={userModal} onHide={() => setUserModal(false)}>
                                    <Modal.Header className='modal-header' closeButton>
                                        <Modal.Title className="text-white" style={{ paddingLeft: 150 }}>Add User</Modal.Title>
                                    </Modal.Header>
                                    <form onSubmit={AddUser}>
                                        <Modal.Body>
                                            <label htmlFor="category" className='fs-5 mb-2'>Name</label>
                                            <input className="w-100 mb-2 input" type="text" name="name"
                                                placeholder='Enter Name'
                                                onChange={handleUserDetails} required /><br />
                                            <label htmlFor="category" className='fs-5 mb-2'>Email Address</label>
                                            <input className="w-100 mb-2 input" type="email" name="email"
                                                placeholder='Enter Email'
                                                onChange={handleUserDetails} required /><br />
                                            <label htmlFor="category" className='fs-5 mb-2'>Contact Number</label>
                                            <input className="w-100 mb-2 input" type="tel" name="mobile" pattern="[0-9]{5}[0-9]{5}"
                                                placeholder='1234567890'
                                                onChange={handleUserDetails} required /><br />
                                            <label htmlFor="category" className='fs-5 mb-2'>Password</label>
                                            <input className="w-100 mb-2 input" type="password" name="password"
                                                placeholder='Enter Password'
                                                onChange={handleUserDetails} required /><br />

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setUserModal(false)}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" variant="primary">
                                                Add User
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                        <div className="card mt-5 mb-3">

                            <div className='scroll'>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Contact </th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentRecords.filter((val) => {
                                            if (searchProduct === "") {
                                                return val;
                                            }
                                            else if (val.name.toLowerCase().includes(searchProduct.toLowerCase())) {
                                                return val;
                                            }
                                        }).map((item) => {
                                            return (
                                                <tr>
                                                    <td className='action-width' style={{ width: 250 }}>{item.name}</td>
                                                    <td className='action-width'>{item.email}</td>
                                                    <td className='action-width'>{item.mobile}</td>
                                                    <td>
                                                        <button className="btn btn-primary px-3 pb-2"
                                                            onClick={() => {
                                                                handleEditUser(item._id)
                                                                setUserData(item)
                                                                setId(item._id)
                                                            }}>
                                                            <FiEdit />
                                                        </button>
                                                        <button className="btn btn-primary px-3 pb-2 ms-2"
                                                            onClick={() => DeleteUser(item._id)}>
                                                            <MdDelete />
                                                        </button>
                                                    </td>
                                                    <Modal show={edituserModal === item._id ? true : false}
                                                        onHide={() => setEditUserModal(false)}>
                                                        <EditUser data={userdata} id={id} />
                                                    </Modal>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pagination
                            nPages={nPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>

                </div>



            </div>
        </>
    );
}

export default UsersList;
