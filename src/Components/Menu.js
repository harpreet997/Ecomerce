import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import EditFooter from './EditFooter';
import Pagination from './Pagination';
import { getAllFooter } from '../getData/getdata';
import { addFooter, deleteFooter } from '../postData/postdata';
import { headers } from '../Header';
import { MdShoppingBag, MdDelete } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { Button, Modal } from "react-bootstrap";
import '../styles/manageProduct.css';

const Menu = () => {
    const [footerList, setFooterList] = useState([]);
    const [footerdata, setFooterData] = useState({
        title: "",
        matter: ""
    });
    const [footerModal, setFooterModal] = useState(false);
    const [editfooterModal, setEditFooterModal] = useState(false);
    const [searchFooter, setSearchFooter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = footerList.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(footerList.length / recordsPerPage)

    const handleFooter = () => setFooterModal(true);
    const handleEditFooter = (id) => setEditFooterModal(id);

    useEffect(() => {
        getAllFooter()
            .then((response) => {
                setFooterList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleFooterDetails = (event) => {
        setFooterData({
            ...footerdata,
            [event.target.name]: event.target.value
        })
    }

    const AddFooter = (event) => {
        event.preventDefault();
        let data = footerList.find(v => (v.title === footerdata.title))
        if (data) {
            alert("Footer already exists");
        }
        else {
            addFooter(footerdata, headers)
                .then(() => {
                    alert("Footer created successfully");
                    window.location.reload(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }


    const DeleteFooter = (footer_id) => {
        const payload = {
            id: footer_id
        }
        deleteFooter(payload, headers)
            .then(() => {
                alert("Footer deleted successfully");
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
                            placeholder='Enter your Footer'
                            onChange={(e) => setSearchFooter(e.target.value)} />
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
                                <h4>Add Menu</h4>

                            </div>
                            <div className="col-xs-6 col-md-3 col-lg-2">
                                <Button style={{ marginLeft: 0, backgroundColor: "orange", fontWeight: "bold" }}
                                    onClick={handleFooter}
                                    className="border border-warning w-100 py-2 fs-5"
                                >ADD MORE</Button>
                                <Modal show={footerModal} onHide={() => setFooterModal(false)}>
                                    <Modal.Header className='modal-header' closeButton>
                                        <Modal.Title className="text-white" style={{ paddingLeft: 150 }}>
                                            Add Menu</Modal.Title>
                                    </Modal.Header>
                                    <form onSubmit={AddFooter}>
                                        <Modal.Body>
                                            <label htmlFor="title" className='fs-5 mb-2'>Title</label>
                                            <input className="w-100 mb-2 input" type="text" name="title"
                                                placeholder='Enter Title'
                                                onChange={handleFooterDetails} required /><br />
                                            <label htmlFor="matter" className='fs-5 mb-2'>Description</label><br />
                                            <textarea className="mb-2 textarea" name="matter" id="matter" cols="60" rows="5"
                                                onChange={handleFooterDetails} placeholder='Enter Description' required></textarea>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setFooterModal(false)}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" variant="primary">
                                                Add Menu
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                        <div className="card mt-5 mb-3">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRecords.filter((val) => {
                                        return val.title.toLowerCase().includes(searchFooter.toLowerCase())
                                    }).map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className='action-width'>{item.title}</td>
                                                <td className='action-width'>{item.matter}</td>
                                                <td>
                                                    <button className="btn btn-primary px-3 pb-2" onClick={() => {
                                                        handleEditFooter(item._id)
                                                        setFooterData(item)
                                                    }}><FiEdit />
                                                    </button>
                                                    <button className="btn btn-primary px-3 pb-2 ms-2" onClick={() =>
                                                        DeleteFooter(item._id)}>
                                                        <MdDelete />
                                                    </button>
                                                </td>
                                                <Modal show={editfooterModal === item._id ? true : false} onHide={() => setEditFooterModal(false)}>
                                                    <EditFooter data={footerdata} />
                                                </Modal>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
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

export default Menu;
