import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import '../styles/manageProduct.css';
import { useNavigate } from 'react-router-dom';
const ManageProducts = () => {
    const [data, setData] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
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
    const [categorydata, setCategoryData] = useState({ category: "" });
    const [subcategorydata, setSubCategoryData] = useState({
        category: "",
        subcategory: []
    });
    const [productModal, setProductModal] = useState(false);
    const [categoryModal, setCategoryModal] = useState(false);
    const [subCategoryModal, setSubCategoryModal] = useState(false);
    const navigate = useNavigate();
    const [searchProduct, setSearchProduct] = useState('');
    const handleClose = () => setProductModal(false);
    const handleProduct = () => setProductModal(true);
    const handleCategory = () => setCategoryModal(true);
    const handleSubCategory = () => setSubCategoryModal(true);
    let headers = {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
    useEffect(() => {
        axios.get('http://localhost:3500/api/allProducts')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:3500/api/allCategory')
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleProductDetails = (event) => {
        setProductData({
            ...productdata,
            [event.target.name]: event.target.value
        })
    }


    const handleImage = (event) => {
        console.log(event.target.files[0]);
        setProductData({
            ...productdata,
            [event.target.name]: event.target.files[0]
        })
    }


    const handleCategoryDetails = (event) => {
        setCategoryData({
            ...categorydata,
            [event.target.name]: event.target.value
        })
    }

    const handleSubCategoryDetails = (event) => {
        setSubCategoryData({
            ...subcategorydata,
            [event.target.name]: event.target.value
        })
    }
    
    const AddProduct = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3500/api/addProduct', productdata, { headers }
        )
            .then((response) => {
                console.log(response);
                alert(JSON.stringify(response.data.msg));

            })
            .catch((error) => {
                console.log(error);
            })

    }

    const AddCategory = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3500/api/addCategory', categorydata, { headers }
        )
            .then((response) => {
                if(response.data.msg === undefined)
                {
                    alert("Category already exists");
                }
                else
                {
                    alert(JSON.stringify(response.data.msg));
                    window.location.reload(false);
                }
            })
            .catch((error) => {
                console.log(error);
            })



    }

    const AddSubCategory = (event) => {
        event.preventDefault();

        axios.put('http://localhost:3500/api/updateSubCategory', subcategorydata, { headers }
        )
            .then((response) => {
                console.log(response);
                alert(JSON.stringify(response.data.msg));
                //window.location.reload(false);

            })
            .catch((error) => {
                console.log(error);
            })

    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert("Loging Out");
        navigate("/");
    }
    return (
        <>
            <div className="sidebar">
                <a className="active text-align" href="#home">Manage Products</a>
                <button onClick={handleProduct} type="button" className="btn btn-secondary w-100 mb-2 mt-2">Add Product</button>
                <Modal show={productModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product Details</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={AddProduct}>
                        <Modal.Body>
                            <label htmlFor="category">Select Category</label>
                            <select className="w-100 mb-2" name="category" id="category"
                                onChange={handleProductDetails} required>
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
                                {categoryList.map((item, i) => {
                                    for (i = 0; i < item.subcategory.length; i++) {
                                        return (
                                            <option value={item.subcategory[i]} >{item.subcategory[i]}</option>
                                        )
                                    }
                                })}
                            </select>
                            <label htmlFor="">Product Name</label><br />
                            <input className="w-100 mb-2" type="text" name="name" placeholder='Enter Product name'
                                onChange={handleProductDetails} required /><br />
                            <label htmlFor="">Product Image</label><br />
                            <input className="w-100 mb-2" type="file" name="image" placeholder='Select Image'
                                onChange={handleImage} required /><br />
                            <label htmlFor="">Quantity</label><br />
                            <input className="w-100 mb-2" type="number" name="quantity" placeholder='Enter Quantity'
                                onChange={handleProductDetails} required /><br />
                            <label htmlFor="">Price</label><br />
                            <input className="w-100 mb-2" type="number" name="price" placeholder='Enter Price'
                                onChange={handleProductDetails} required /><br />
                            <label htmlFor="">Details</label><br />
                            <textarea className="mb-2" name="details" id="details" cols="60" rows="5"
                                onChange={handleProductDetails} required></textarea><br />
                            <label htmlFor="">Specifications</label><br />
                            <input className="w-100 mb-2" type="text" name="specifications" placeholder='Enter Specifications'
                                onChange={handleProductDetails} required /><br />
                            <label htmlFor="">Features</label><br />
                            <input className="w-100 mb-2" type="text" name="features" placeholder='Enter Features'
                                onChange={handleProductDetails} required /><br />

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
                <button onClick={handleCategory} type="button" className="btn btn-secondary w-100 mb-2">Add Category</button>
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
                <button onClick={handleSubCategory} type="button" className="btn btn-secondary w-100 mb-2">Add SubCategory</button>
                <Modal show={subCategoryModal} onHide={() => setSubCategoryModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sub Category Details</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={AddSubCategory}>
                        <Modal.Body>
                            <label htmlFor="category">Select Category</label>
                            <select className="w-100 mb-2" name="category" id="category"
                                onChange={handleSubCategoryDetails} value={subcategorydata.category} required>
                                <option value="">Select</option>
                                {categoryList.map((item) => {
                                    return (
                                        <option value={item.category} >{item.category}</option>
                                    )
                                })}
                            </select>
                            <label htmlFor="subCategory">Sub Category</label>
                            <input className="w-100 mb-2" type="text" name="subcategory"
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

            <div className="content">
                <div className="row">
                    <div className="col-lg-11">
                        <input className="w-100" type="text" name="Search" placeholder='Search Products...'
                            onChange={(e) => setSearchProduct(e.target.value)} />
                    </div>
                    <div className="col-lg-1">
                        <Button variant="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">SubCategory</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((val) => {
                            if (searchProduct === "") {
                                return val;
                            }
                            else if (val.name.toLowerCase().includes(searchProduct.toLowerCase())) {
                                return val;
                            }
                        })
                            .map((item) => {
                                return (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.category}</td>
                                        <td>{item.subcategory}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ManageProducts;