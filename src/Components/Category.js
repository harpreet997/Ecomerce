import React, { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import '../styles/manageProduct.css';
import Sidebar from './Sidebar';
import { MdShoppingBag } from 'react-icons/md';
import { getAllCategory } from '../getData/getdata';
import { addCategory } from '../postData/postdata';
import Pagination from './Pagination';

const Category = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [categorydata, setCategoryData] = useState({ category: "" });
    const [categoryModal, setCategoryModal] = useState(false);
    const [searchProduct, setSearchProduct] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = categoryList.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(categoryList.length / recordsPerPage)

    const handleCategory = () => setCategoryModal(true);

    let headers = {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
    useEffect(() => {
        getAllCategory()
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleCategoryDetails = (event) => {
        setCategoryData({
            ...categorydata,
            [event.target.name]: event.target.value
        })
    }

    const AddCategory = (event) => {
        event.preventDefault();
        addCategory(categorydata, headers)
            .then((response) => {
                if (response.data.msg === undefined) {
                    alert("Category already exists");
                }
                else {
                    alert(JSON.stringify(response.data.msg));
                    window.location.reload(false);
                }
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
                        <input className="w-100" type="text" name="Search" placeholder='Search Products...'
                            onChange={(e) => setSearchProduct(e.target.value)} />
                    </div>
                    <div className="col-md-2 col-lg-1">
                        <MdShoppingBag style={{ width: 50, height: 30 }} />
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xs-6 col-md-9 col-lg-10">
                                <h4>Add Category</h4>
                            </div>
                            <div className="col-xs-6 col-md-3 col-lg-2">
                                <Button style={{ marginLeft: 50 }} onClick={handleCategory} className="bg-warning bg-gradient">ADD MORE</Button>
                                <Modal show={categoryModal} onHide={() => setCategoryModal(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Category Details</Modal.Title>
                                    </Modal.Header>
                                    <form onSubmit={AddCategory}>
                                        <Modal.Body>
                                            <label htmlFor="category">Category</label>
                                            <input className="w-100 mb-2" type="text" name="category" value={categorydata.category}
                                                placeholder='Enter Category'
                                                onChange={handleCategoryDetails} required /><br />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setCategoryModal(false)}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" variant="primary">
                                                Add Category
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                        <div className="card mt-5 mb-3">
                            <table>
                                <div className="row border-bottom">
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        <h4>Category ID</h4>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        <h4>Category</h4>
                                    </div>

                                </div>
                                <div className="row mx-0">
                                    {currentRecords.filter((val) => {
                                        if (searchProduct === "") {
                                            return val;
                                        }
                                        else if (val.category.toLowerCase().includes(searchProduct.toLowerCase())) {
                                            return val;
                                        }
                                    }).map((item, i) => {
                                        return (
                                            <>
                                                <div className="col-xs-6 col-sm-6 col-md-6">
                                                    <p>{item._id}</p>
                                                </div>

                                                <div className="col-xs-6 col-sm-6 col-md-6">
                                                    <p>{item.category}</p>
                                                </div>
                                            </>
                                        )
                                    })}


                                </div>
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

export default Category;
