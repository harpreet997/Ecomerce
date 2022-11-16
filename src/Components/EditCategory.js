import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { editCategory } from "../postData/postdata";
import { headers } from "../Header";

const EditCategory = ({ data, id }) => {
    const [editcategorydata, setEditCategorydata] = useState({
        category: data.category
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
        alert(`updated category, ${editcategorydata.category} ${id}`);
        editCategory(editcategorydata, headers, id)
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
                    <label htmlFor="category" className='fs-5 mb-2'>Category</label>
                    <input className="w-100 mb-2 input" type="text" name="category" value={editcategorydata.category}
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