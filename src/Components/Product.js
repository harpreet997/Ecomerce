import React, { useState, useEffect } from 'react';
import { Button, Modal } from "react-bootstrap";
import Sidebar from './Sidebar';
import { MdShoppingBag } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { getAllProducts, getAllCategory } from '../getData/getdata';
import { addProduct } from '../postData/postdata';
import { deleteProduct } from '../postData/postdata';
import Pagination from './Pagination';
import ProductImage from '../images/IphonePro.jpg';
import '../styles/manageProduct.css';
import EditProduct from './EditProduct';
import { headers } from '../Header';

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
    const filterdata = data.filter(item => {
        return item.image !== "/uploads/undefined" && item._id !== "6360b6e537bc34b2e06b054a"
    })

    const [productModal, setProductModal] = useState(false);
    const [editproductModal, setEditProductModal] = useState(false);
    const [searchProduct, setSearchProduct] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filterdata.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(filterdata.length / recordsPerPage)
    const formdata = new FormData();

    const handleClose = () => setProductModal(false);
    const handleProduct = () => setProductModal(true);
    const handleEditProduct = (id) => {
        setEditProductModal(id)

    };


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

    const DeleteProduct = (p_id) => {
        const payload = {
            id: p_id
        }
        deleteProduct(payload, headers)
            .then((response) => {
                alert(JSON.stringify(response.data.msg));
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const AddProduct = (event) => {
        event.preventDefault();
        if (productdata.quantity <= 0) {
            alert("Please fill valid quantity");
        }
        else if (productdata.price <= 0) {
            alert("Please fill valid price");
        }
        else {
            formdata.append('name', productdata.name)
            formdata.append('price', productdata.price)
            formdata.append('quantity', productdata.quantity)
            formdata.append('features', productdata.features)
            formdata.append('details', productdata.details)
            formdata.append('specifications', productdata.specifications)
            formdata.append('category', productdata.category)
            formdata.append('subcategory', productdata.subcategory)
            formdata.append('image', productdata.image)
        }
        let data1 = data.find(v => (v.name === productdata.name))
        if (data1) {
            alert("Product already exists");
        }
        else {
            addProduct(formdata, headers)
                .then(() => {
                    alert("Product added successfully");
                    window.location.reload(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <>
            <Sidebar />
            <div className="content">
                <div className="row mt-4 mb-4">
                    <div className="col-md-10 col-lg-11">
                        <input className="w-100 ps-3 search-input" type="text" name="Search" placeholder='Enter your Product Name'
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
                            <div className="col-md-9 col-lg-10">
                                <h4>Add Product</h4>
                            </div>
                            <div className="col-md-3 col-lg-2">
                                <Button style={{ marginLeft: 0, backgroundColor: "orange", fontWeight: "bold" }}
                                    onClick={handleProduct} className="border border-warning w-100 py-2 fs-5">ADD MORE</Button>
                                <Modal show={productModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className="text-white" style={{ paddingLeft: 160 }}>Add Product</Modal.Title>
                                    </Modal.Header>
                                    <form onSubmit={AddProduct}>
                                        <Modal.Body>
                                            <label htmlFor="category" className='fs-5 mb-2'>Select Category</label>
                                            <select className="w-100 mb-2 input" name="category" id="category"
                                                onChange={handleCategorySelect} required>
                                                <option value="">Select</option>
                                                {categoryList.map((item) => {
                                                    return (
                                                        <option value={item.category} >{item.category}</option>
                                                    )

                                                })}
                                            </select>
                                            <label htmlFor="subcategory" className='fs-5 mb-2'>Select Sub Category</label>
                                            <select className="w-100 mb-2 input" name="subcategory" id="subcategory"
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
                                            <label htmlFor="productName" className='fs-5 mb-2'>Product Name</label><br />
                                            <input className="w-100 mb-2 input" type="text" name="name" placeholder='Enter Product name'
                                                onChange={handleProductDetails} required /><br />
                                            <label htmlFor="productImage" className='fs-5 mb-2'>Product Image</label><br />
                                            <input className="w-100 mb-2" type="file" name="image" accept="image/*" placeholder='Select Image'
                                                onChange={handleImage} required /><br />
                                            <label htmlFor="quantity" className='fs-5 mb-2'>Quantity</label><br />
                                            <input className="w-100 mb-2 input" type="number" min={1} name="quantity" placeholder='Enter Quantity'
                                                onChange={handleProductDetails} required /><br />
                                            <label htmlFor="price" className='fs-5 mb-2'>Price</label><br />
                                            <input className="w-100 mb-2 input" type="number" min={1} name="price" placeholder='Enter Price'
                                                onChange={handleProductDetails} required /><br />
                                            <label htmlFor="details" className='fs-5 mb-2'>Details</label><br />
                                            <textarea className="mb-2 textarea" name="details" id="details" cols="60" rows="5"
                                                onChange={handleProductDetails} placeholder='Enter Details' required></textarea><br />
                                            <label htmlFor="specifications" className='fs-5 mb-2'>Specifications</label><br />
                                            <textarea className="mb-2 textarea" name="specifications" id="specifications" cols="60"
                                                rows="5" placeholder='Enter Specifications'
                                                onChange={handleProductDetails} required /><br />
                                            <label htmlFor="features" className='fs-5 mb-2'>Features</label><br />
                                            <textarea className="mb-2 textarea" name="features" id="features" cols="60" rows="5"
                                                placeholder='Enter Features'
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
                            </div>
                        </div>
                        <div className="card mt-5 mb-3">
                            <div className='scroll'>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Sub Category</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Image</th>
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
                                        }).map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td style={{ width: 350 }}>{item.name}</td>
                                                    <td>{item.category}</td>
                                                    <td>{item.subcategory}</td>
                                                    <td>&#8377;{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.image !== "/uploads/undefined" ?
                                                        <img className='product-image' src={"data:image/png;base64," + item.image}
                                                            alt="productImage" />
                                                        : <img className='product-image' src={ProductImage} alt="productImage" />}</td>
                                                    <td>
                                                        <button className="btn btn-primary px-3 pb-2" onClick={() => {
                                                            handleEditProduct(item._id);
                                                            setProductData(item);
                                                        }}>
                                                            <FiEdit />
                                                        </button>

                                                        <button className="btn btn-primary px-3 pb-2 ms-2"
                                                            onClick={() => DeleteProduct(item._id)}>
                                                            <MdDelete />
                                                        </button>
                                                    </td>
                                                    <Modal show={editproductModal === item._id ? true : false}
                                                        onHide={() => setEditProductModal(false)}>
                                                        <EditProduct data={productdata} categoryList={categoryList} />
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

export default Product;
