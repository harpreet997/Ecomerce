import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import './App.css';

function App() {
  const [data, setData] = useState([]);
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
  const [categorydata, setCategoryData] = useState();
  const [subcategorydata, setSubCategoryData] = useState();
  const [productModal, setProductModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const handleClose = () => setProductModal(false);
  const handleProduct = () => setProductModal(true);
  const handleCategory = () => setCategoryModal(true);
  const handleSubCategory = () => setSubCategoryModal(true);

  useEffect(() => {
    axios.get('http://localhost:3500/api/allProducts')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  })

  const handleProductDetails = (event) => {
    setProductData({
      ...productdata,
      [event.target.name]: event.target.value
    })
  }


  const AddProduct = (event) => {
    event.preventDefault();
    alert("Calling add product");
  }

  const AddCategory = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3500/api/addCategory', categorydata
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })

  }

  const AddSubCategory = (event) => {
    event.preventDefault();
    alert(`Sub Category details ${subcategorydata}`);
  }
  return (
    <>
      <div className="sidebar">
        <a className="active text-center" href="#home">Manage Products</a>
        <button onClick={handleProduct} type="button" className="btn btn-secondary w-100 mb-2 mt-2">Add Product</button>
        <Modal show={productModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <form onSubmit={AddProduct}>
            <Modal.Body>
              <label htmlFor="category">Select Category</label>
              {data.map((item) => {
                return (
                  <select className="w-100 mb-2" name="category" id="category"
                    onChange={handleProductDetails} required>
                    <option value="">Select</option>
                    <option value={item.category} >{item.category}</option>
                  </select>
                )
              })}
              <label htmlFor="subCategory">Select Sub Category</label>
              {data.map((item) => {
                return (
                  <select className="w-100 mb-2" name="subCategory" id="subCategory"
                    onChange={handleProductDetails} required>
                    <option value="">Select</option>
                    <option value={item.subcategory} >{item.subcategory}</option>
                  </select>
                )
              })}

              <label htmlFor="">Product Name</label><br />
              <input className="w-100 mb-2" type="text" name="productName" placeholder='Enter Product name'
                onChange={handleProductDetails} required /><br />
              <label htmlFor="">Product Image</label><br />
              <input className="w-100 mb-2" type="file" name="productImage" placeholder='Select Image'
                onChange={handleProductDetails} required /><br />
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
              <input className="w-100 mb-2" type="text" name="productName" placeholder='Enter Specifications'
                onChange={handleProductDetails} required /><br />
              <label htmlFor="">Features</label><br />
              <input className="w-100 mb-2" type="text" name="productName" placeholder='Enter Features'
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
              <input className="w-100 mb-2" type="text" name="Category" placeholder='Enter Category'
                onChange={(e) => setCategoryData(e.target.value)} required /><br />
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
              <label htmlFor="subCategory">Sub Category</label>
              <input className="w-100 mb-2" type="text" name="subCategory" placeholder='Enter SubCategory'
                onChange={(e) => setSubCategoryData(e.target.value)} required /><br />
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
        <input className="input-group w-100" type="text" name="Search" placeholder='Search Products...' />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Product Name</th>
              <th scope="col">Category</th>
              <th scope="col">SubCategory</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr>
                  <th scope="row">1</th>
                  <td>{item.name}</td>
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

export default App;
