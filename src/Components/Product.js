import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from "react-bootstrap";
import '../styles/manageProduct.css';
import Sidebar from './Sidebar';
import { MdShoppingBag } from 'react-icons/md';
import { getAllProducts, getAllCategory } from '../getData/getdata';

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
    const [image, setImage] = useState();
    const [productModal, setProductModal] = useState(false);
    
    const formdata = new FormData();
    const [searchProduct, setSearchProduct] = useState('');
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
        console.log(category)
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

    const handleImage = (e) => {
        console.log(e.target.files[0]);
        convertToBase64(e.target.files[0]);
    };

    const convertToBase64 = (selectedFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
            console.log('called: ', reader.result);
            setProductData({
                ...productdata,
                image: reader.result
            })
        };
        
    };

    // const handleImage = (event) => {
    //     console.log(event.target.files[0]);
    //     setImage(URL.createObjectURL(event.target.files[0]))
    //     console.log(URL.createObjectURL(event.target.files[0]))
    //     //formdata.append("image", image);
    //     setProductData({
    //         ...productdata,
    //         image: event.target.files[0]
    //     })
    //     console.log(event.target.files[0]);
    //     console.log(productdata.image);
    // }

    const AddProduct = (event) => {
        event.preventDefault();
        console.log(productdata);
        let payload = {
            name: productdata.name,
            price: productdata.price,
            quantity: productdata.quantity,
            image: productdata.image,
            details: productdata.details,
            specifications: productdata.specifications,
            features: productdata.features,
            category: productdata.category,
            subcategory: productdata.subcategory
        };
        axios.post('http://localhost:3500/api/addProduct', payload, { headers }
        )
            .then((response) => {
                console.log(response);
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
                    <div className="col-lg-11">
                        <input className="w-100" type="text" name="Search" placeholder='Search Category...'
                            onChange={(e) => setSearchProduct(e.target.value)} />
                    </div>
                    <div className="col-lg-1">
                        <MdShoppingBag style={{ width: 50, height: 30 }} />
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-10">
                                <h4>Add Product</h4>
                            </div>
                            <div className="col-lg-2">
                                <Button style={{ marginLeft: 50 }} onClick={handleProduct} className="bg-warning bg-gradient">ADD MORE</Button>
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
                        <div className="card mt-5">
                            <table>
                                <div className="row border-bottom">

                                    <div className="col-lg-4">
                                        <h4>Product ID</h4>
                                    </div>

                                    <div className="col-lg-4">
                                        <h4>Product Name</h4>
                                    </div>
                                    <div className="col-lg-4">
                                        <h4>Product Price</h4>
                                    </div>

                                </div>
                                <div className="row mx-0">
                                    {data.filter((val) => {
                                        if (searchProduct === "") {
                                            return val;
                                        }
                                        else if (val.name.toLowerCase().includes(searchProduct.toLowerCase())) {
                                            return val;
                                        }
                                    }).map((item, i) => {
                                        return (
                                            <>
                                                <div className="col-lg-4">
                                                    <p>{i + 1}</p>
                                                </div>

                                                <div className="col-lg-4">
                                                    <p>{item.name}</p>

                                                </div>
                                                <div className="col-lg-4">
                                                    <p>{item.price}</p>

                                                </div>
                                            </>
                                        )
                                    })}


                                </div>
                            </table>
                        </div>
                    </div>

                </div>



            </div>
        </>
    );
}

export default Product;
