import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { editProduct } from "../postData/postdata";
import { headers } from "../Header";

const EditProduct = ({ getAllData, data, categoryList, id }) => {
    const [editproductdata, setEditProductData] = useState({
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        image: data.image,
        details: data.details,
        specifications: data.specifications,
        features: data.features,
        category: data.category,
        subcategory: data.subcategory,
    })
    const [subcategoryList, setSubCategoryList] = useState([data.subcategory]);
    const formdata = new FormData();

    console.log(data.subcategory);
    console.log(editproductdata.subcategory);
    const handleCategorySelect = (event) => {
        const category = event.target.value;
        setEditProductData({
            ...editproductdata,
            [event.target.name]: event.target.value
        })
        let data = categoryList.find(v => (v.category === category))
        setSubCategoryList(data.subcategory)

    }

    const handleProductDetails = (event) => {
        setEditProductData({
            ...editproductdata,
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (event) => {
        setEditProductData({
            ...editproductdata,
            image: event.target.files[0]
        })

    }

    const handleClose = () => {
        window.location.reload(false);
    }

    const UpdateProduct = (event) => {
        event.preventDefault();
        if(editproductdata.quantity <=0)
        {
            alert("Please fill valid quantity");
        }
        else if(editproductdata.price <=0)
        {
            alert("Please fill valid price");
        }
        else
        {      
        formdata.append('name', editproductdata.name)
        formdata.append('price', editproductdata.price)
        formdata.append('quantity', editproductdata.quantity)
        formdata.append('features', editproductdata.features)
        formdata.append('details', editproductdata.details)
        formdata.append('specifications', editproductdata.specifications)
        formdata.append('category', editproductdata.category)
        formdata.append('subcategory', editproductdata.subcategory)
        formdata.append('image', editproductdata.image)
        }
        let data1 = getAllData.find(v => (v.name === editproductdata.name))
        if (data1) {
            alert("Product already exists");
        }
        else {
            editProduct(formdata, headers, id)
                .then((response) => {
                    alert(JSON.stringify(response.data.msg));
                    window.location.reload(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-white" style={{ paddingLeft: 160 }}>Update Product</Modal.Title>
            </Modal.Header>
            <form onSubmit={UpdateProduct}>
                <Modal.Body>
                    <label htmlFor="category" className='fs-5 mb-2'>Select Category</label>
                    <select className="w-100 mb-2 input" name="category" id="category"
                        value={editproductdata.category} onChange={handleCategorySelect} required>
                        <option value="">Select</option>
                        {categoryList.map((item) => (<option value={item.category} >{item.category}</option>))}
                    </select>
                    <label htmlFor="subcategory" className='fs-5 mb-2'>Select Sub Category</label>
                    <select className="w-100 mb-2 input" name="subcategory" id="subcategory"
                        value={editproductdata.subcategory} onChange={handleProductDetails} required>
                        <option value="">Select</option>
                        {subcategoryList.map(item => <option value={item} >{item}</option>)}
                    </select>
                    <label htmlFor="productName" className='fs-5 mb-2'>Product Name</label><br />
                    <input className="w-100 mb-2 input" type="text" name="name" value={editproductdata.name}
                        placeholder='Enter Product name'
                        onChange={handleProductDetails} required /><br />
                    <label htmlFor="productImage" className='fs-5 mb-2'>Product Image</label><br />
                    <input className="w-100 mb-2" type="file" name="image" accept="image/*" placeholder='Select Image'
                        onChange={handleImage} /><br />
                    
                        <img className='product-image' src={"data:image/png;base64," + data.image}
                            alt="productImage" />
                    <br />
                    <label htmlFor="quantity" className='fs-5 mb-2'>Quantity</label><br />
                    <input className="w-100 mb-2 input" type="number" min={1} name="quantity" value={editproductdata.quantity}
                        placeholder='Enter Quantity'
                        onChange={handleProductDetails} required /><br />
                    <label htmlFor="price" className='fs-5 mb-2'>Price</label><br />
                    <input className="w-100 mb-2 input" type="number" min={1} name="price" value={editproductdata.price}
                        placeholder='Enter Price'
                        onChange={handleProductDetails} required /><br />
                    <label htmlFor="details" className='fs-5 mb-2'>Details</label><br />
                    <textarea className="mb-2 textarea" name="details" id="details" cols="60" rows="5"
                        onChange={handleProductDetails} placeholder='Enter Details' value={editproductdata.details}
                        required></textarea><br />
                    <label htmlFor="specifications" className='fs-5 mb-2'>Specifications</label><br />
                    <textarea className="mb-2 textarea" name="specifications" id="specifications" cols="60" rows="5"
                        placeholder='Enter Specifications'
                        onChange={handleProductDetails} value={editproductdata.specifications} required /><br />
                    <label htmlFor="features" className='fs-5 mb-2'>Features</label><br />
                    <textarea className="mb-2 textarea" name="features" id="features" cols="60" rows="5"
                        placeholder='Enter Features'
                        onChange={handleProductDetails} value={editproductdata.features} required /><br />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Update Product
                    </Button>
                </Modal.Footer>
            </form>
        </>
    );
}

export default EditProduct;

