import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { editCategory } from "../postData/postdata";
import { headers } from "../Header";

const EditCategory = ({ data }) => {
    const [editcategorydata, setEditCategorydata] = useState({
        old: data.category,
        new: ""
    })
    const handleCategoryDetails = (event) => {
        setEditCategorydata({
            ...editcategorydata,
            [event.target.name]: event.target.value
        })
    }


    const handleClose = () => {
        window.location.reload(false);
    }

    const UpdateCategory = (event) => {
        event.preventDefault();
        editCategory(editcategorydata, headers)
            .then(() => {
                alert("category updated sucessfully");
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <Modal.Header className='modal-header' closeButton>
                <Modal.Title className="text-white" style={{ paddingLeft: 150 }}>Update Category</Modal.Title>
            </Modal.Header>
            <form onSubmit={UpdateCategory}>
                <Modal.Body>
                <label htmlFor="oldcategory" className='fs-5 mb-2'>Old Category</label>
                    <input className="w-100 mb-2 input" type="text" name="old" value={editcategorydata.old} readOnly
                        placeholder='Enter Category' onChange={handleCategoryDetails}
                        required /><br />
                    <label htmlFor="newcategory" className='fs-5 mb-2'>New Category</label>
                    <input className="w-100 mb-2 input" type="text" name="new" 
                        placeholder='Enter Category' onChange={handleCategoryDetails}
                        required /><br />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Update Category
                    </Button>
                </Modal.Footer>
            </form>
        </>
    );
}

export default EditCategory;