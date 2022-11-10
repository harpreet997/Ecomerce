import React, { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import '../styles/manageProduct.css';
import Sidebar from './Sidebar';
import { MdShoppingBag } from 'react-icons/md';
import { getAllProducts, getAllCategory } from '../getData/getdata';
import { addProduct } from '../postData/postdata';
import Pagination from './Pagination';

const Product = () => {
    const [data, setData] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [subcategoryList, setSubCategoryList] = useState([]);
    const [productdata, setProductData] = useState({
        name: "",
        price: "",
        quantity: "",
        image: "",
        details: "",
        specifications: "",
        features: "",
        category: "",
        subcategory: ""
    })
    const [productModal, setProductModal] = useState(false);
    const [searchProduct, setSearchProduct] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)
    const handleClose = () => setProductModal(false);
    const handleProduct = () => setProductModal(true);

    let headers = {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
    useEffect(() => {
        getAllProducts()
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

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
        setProductData({
            ...productdata,
            [event.target.name]: event.target.value
        })
        let data = categoryList.find(v => (v.category === category))
        setSubCategoryList(data.subcategory)

    }

    const handleProductDetails = (event) => {
        setProductData({
            ...productdata,
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (event) => {
        setProductData({
            ...productdata,
            image: event.target.files[0]
        })
    }

    const AddProduct = (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('name', productdata.name)
        formdata.append('price', productdata.price)
        formdata.append('quantity', productdata.quantity)
        formdata.append('features', productdata.features)
        formdata.append('details', productdata.details)
        formdata.append('specifications', productdata.specifications)
        formdata.append('category', productdata.category)
        formdata.append('subcategory', productdata.subcategory)
        formdata.append('image', productdata.image)

        addProduct(formdata, headers)
            .then((response) => {
                alert(JSON.stringify(response.data.msg));

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
                        <input className="w-100" type="text" name="Search" placeholder='Search Category...'
                            onChange={(e) => setSearchProduct(e.target.value)} />
                    </div>
                    <div className="col-md-2 col-lg-1">
                        <MdShoppingBag style={{ width: 50, height: 30 }} />
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-9 col-lg-10">
                                <h4>Add Product</h4>
                            </div>
                            <div className="col-md-3 col-lg-2">
                                <Button style={{ marginLeft: 0, backgroundColor: "orange", fontWeight: "bold" }}
                                    onClick={handleProduct} className="border border-warning w-100 py-2 fs-5">ADD MORE</Button>
                                <Modal show={productModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Product Details</Modal.Title>
                                    </Modal.Header>
                                    <form onSubmit={AddProduct}>
                                        <Modal.Body>
                                            <label htmlFor="category">Select Category</label>
                                            <select className="w-100 mb-2" name="category" id="category"
                                                value={productdata.category} onChange={handleCategorySelect} required>
                                                <option value="">Select</option>
                                                {categoryList.map((item) => {
                                                    return (
                                                        <option value={item.category} >{item.category}</option>
                                                    )

                                                })}
                                            </select>
                                            <label htmlFor="subcategory">Select Sub Category</label>
                                            <select className="w-100 mb-2" name="subcategory" id="subcategory"
                                                onChange={handleProductDetails} required>
                                                <option value="">Select</option>
                                                {subcategoryList.map((item, i) => {
                                                    for (i = 0; i < item.length; i++) {
                                                        return (
                                                            <option value={item} >{item}</option>
                                                        )
                                                    }
                                                })}
                                            </select>
                                            <label htmlFor="">Product Name</label><br />
                                            <input className="w-100 mb-2" type="text" name="name" value={productdata.name} placeholder='Enter Product name'
                                                onChange={handleProductDetails} required /><br />
                                            <label htmlFor="">Product Image</label><br />
                                            <input className="w-100 mb-2" type="file" name="image" placeholder='Select Image'
                                                onChange={handleImage} required /><br />
                                            <label htmlFor="">Quantity</label><br />
                                            <input className="w-100 mb-2" type="number" name="quantity" value={productdata.quantity} placeholder='Enter Quantity'
                                                onChange={handleProductDetails} required /><br />
                                            <label htmlFor="">Price</label><br />
                                            <input className="w-100 mb-2" type="number" name="price" value={productdata.price} placeholder='Enter Price'
                                                onChange={handleProductDetails} required /><br />
                                            <label htmlFor="">Details</label><br />
                                            <textarea className="mb-2" name="details" id="details" cols="60" rows="5"
                                                onChange={handleProductDetails} value={productdata.details} required></textarea><br />
                                            <label htmlFor="">Specifications</label><br />
                                            <input className="w-100 mb-2" type="text" name="specifications" placeholder='Enter Specifications'
                                                onChange={handleProductDetails} value={productdata.specifications} required /><br />
                                            <label htmlFor="">Features</label><br />
                                            <input className="w-100 mb-2" type="text" name="features" placeholder='Enter Features'
                                                onChange={handleProductDetails} value={productdata.features} required /><br />

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" variant="primary">
                                                Add Product
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                        <div className="card mt-5 mb-3">

                            <div className="mx-3 row border-bottom">

                                <div className="col-md-2 col-lg-1">
                                    <h4 className="py-2">Id</h4>
                                </div>
                                <div className="col-md-1 col-lg-1">
                                    <div className="mt-2 h-50 vr"></div>
                                </div>
                                <div className="col-md-4 col-lg-5">
                                    <h4 className="py-2">Product Name</h4>
                                </div>
                                <div className="col-md-1 col-lg-1">
                                    <div className="mt-2 h-50 vr"></div>
                                </div>
                                <div className="col-md-4 col-lg-4">
                                    <h4 className="py-2">Product Price</h4>
                                </div>

                            </div>
                            <div className="row mx-3">
                                {currentRecords.filter((val) => {
                                    if (searchProduct === "") {
                                        return val;
                                    }
                                    else if (val.name.toLowerCase().includes(searchProduct.toLowerCase())) {
                                        return val;
                                    }
                                }).map((item, i) => {
                                    return (
                                        <>
                                            <div className="border-bottom col-md-2 col-lg-1">
                                                <p className='fs-5 pt-2'>0{item._id.slice(2,5)}</p>
                                            </div>
                                            <div className="border-bottom col-md-1 col-lg-1">
                                                <div className="mt-2 h-50 vr"></div>
                                            </div>
                                            <div className="border-bottom col-md-4 col-lg-5">
                                                <p className='fs-5 pt-2'>{item.name}</p>

                                            </div>
                                            <div className="border-bottom col-md-1 col-lg-1">
                                                <div className="mt-2 h-50 vr"></div>
                                            </div>
                                            <div className="border-bottom col-md-4 col-lg-4">
                                                <p className='fs-5 pt-2'>{item.price}</p>

                                            </div>
                                        </>
                                    )
                                })}
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

export default Product;
