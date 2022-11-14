import React, { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import '../styles/manageProduct.css';
import Sidebar from './Sidebar';
import { MdShoppingBag } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { getAllCategory } from '../getData/getdata';
import { addSubCategory } from '../postData/postdata';

const SubCategory = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [subcategorydata, setSubCategoryData] = useState({
        category: "",
        subcategory: []
    });
    const [subcategoryList, setSubCategoryList] = useState([]);
    const [subCategoryModal, setSubCategoryModal] = useState(false);
    const [searchSubCategory, setSearchSubCategory] = useState('');
    const handleSubCategory = () => setSubCategoryModal(true);
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


    const handleCategorySelect = (event) => {
        const category = event.target.value;
        let data = categoryList.find(v => (v.category === category))
        setSubCategoryList(data.subcategory)
    }

    const handleSubCategoryDetails = (event) => {
        setSubCategoryData({
            ...subcategorydata,
            [event.target.name]: event.target.value
        })
    }

    const AddSubCategory = (event) => {
        event.preventDefault();
        let data = categoryList.find(v => (v.category === subcategorydata.category))
        if (data) {
            data.subcategory.push(subcategorydata.subcategory)
        }
        addSubCategory(data, headers)
            .then((response) => {
                console.log(response);
                alert(JSON.stringify(response.data.msg));
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
                        <input className="w-100 ps-3 search-input" type="text" name="Search" placeholder='Enter your Sub Category Name'
                            onChange={(e) => setSearchSubCategory(e.target.value)} />
                        <BsSearch className='search-icon' />
                    </div>
                    <div className="col-md-2 col-lg-1">
                        <MdShoppingBag className="shopping-bag" style={{ width: 50, height: 40 }} />
                    </div>
                </div>
                <div className="card" style={{ height: "100%" }}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-9 col-lg-10">
                                <h4>Add Sub Category</h4>
                            </div>
                            <div className="col-md-3 col-lg-2">
                                <Button style={{ backgroundColor: "orange" }} onClick={handleSubCategory}
                                    className="ms-0 border border-warning w-100 py-2 fs-5 fw-bold">ADD MORE</Button>
                                <Modal show={subCategoryModal} onHide={() => setSubCategoryModal(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className="text-white" style={{paddingLeft: 140}}>Add Sub Category</Modal.Title>
                                    </Modal.Header>
                                    <form onSubmit={AddSubCategory}>
                                        <Modal.Body>
                                            <label htmlFor="category" className='fs-5 mb-2'>Select Category</label>
                                            <select className="w-100 mb-2 input" name="category" id="category"
                                                onChange={handleSubCategoryDetails} value={subcategorydata.category} required>
                                                <option value="">Select</option>
                                                {categoryList.map((item) => {
                                                    return (
                                                        <option value={item.category} >{item.category}</option>
                                                    )
                                                })}
                                            </select>
                                            <label htmlFor="subCategory" className='fs-5 mb-2'>Sub Category</label>
                                            <input className="w-100 mb-2 input" type="text" name="subcategory"
                                                value={subcategorydata.subcategory} placeholder='Enter SubCategory'
                                                onChange={handleSubCategoryDetails} required /><br />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setSubCategoryModal(false)}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" variant="primary">
                                                Add Sub Category
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-lg-12">
                                <h5>Select Category</h5>
                                <select className="w-100 mb-2 input" name="category" id="category"
                                    onChange={handleCategorySelect} required>
                                    <option value="">Select</option>
                                    {categoryList.map((item) => {
                                        return (
                                            <option value={item.category} >{item.category}</option>
                                        )

                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="card mt-2">

                            <div className="row border-bottom mx-3">
                                <div className="col-lg-12">
                                    <h4>Sub Category</h4>
                                </div>

                            </div>
                            {subcategoryList.length > 0 ? 
                                <div className="row mx-3">
                                    {subcategoryList.filter((val) => {
                                        if (searchSubCategory === "") {
                                            return val;
                                        }
                                        else if (val.toLowerCase().includes(searchSubCategory.toLowerCase())) {
                                            return val;
                                        }
                                    }).map((item, i) => {
                                        for (i = 0; i < item.length; i++) {
                                            return (
                                                <>
                                                    <div className="border-bottom col-lg-12">
                                                        <p className='fs-5 pt-2'>{item}</p>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })}
                                </div>
                            : <div className='row mx-3'>
                                <p className='fs-5 pt-2'>No SubCategory Found</p>
                            </div>}


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubCategory;
