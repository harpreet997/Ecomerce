import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { editSubCategory } from "../postData/postdata";
import { headers } from "../Header";

const EditSubCategory = ({ category, data, categoryList, id }) => {
    const [subcategorydata, setSubCategoryData] = useState({
        category: category,
        subcategory: data
    });

    const handleSubCategoryDetails = (event) => {
        setSubCategoryData({
            ...subcategorydata,
            [event.target.name]: event.target.value
        })
    }


    const UpdateSubCategory = (event) => {
        event.preventDefault();
        alert(`updated sub category, ${subcategorydata.category} ${subcategorydata.subcategory}`);
        editSubCategory(subcategorydata, headers, id)
            .then(() => {
                alert("category updated sucessfully");
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleClose = () => {
        window.location.reload(false);
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-white" style={{ paddingLeft: 140 }}>
                    Update Sub Category
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={UpdateSubCategory}>
                <Modal.Body>
                    <label htmlFor="category" className='fs-5 mb-2'>Select Category</label>
                    <select className="w-100 mb-2 input" name="category" id="category"
                        value={subcategorydata.category} required>
                        <option value="">Select</option>
                        {categoryList.map((item) => {
                            return (
                                <option value={item.category} >{item.category}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="subCategory" className='fs-5 mb-2'>Sub Category</label>
                    <input className="w-100 mb-2 input" type="text" name="subcategory"
                        placeholder='Enter SubCategory'
                        value={subcategorydata.subcategory} onChange={handleSubCategoryDetails} 
                        required /><br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Update Sub Category
                    </Button>
                </Modal.Footer>
            </form>
        </>
    );
}

export default EditSubCategory;