import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { editFooter } from "../postData/postdata";
import { headers } from "../Header";

const EditFooter = ({ data }) => {
    const [editFooterData, setEditFooterData] = useState({
        title: data.title,
        matter: data.matter,
        id: data._id
    })
    const handleFooterDetails = (event) => {
        setEditFooterData({
            ...editFooterData,
            [event.target.name]: event.target.value
        })
    }


    const handleClose = () => {
        window.location.reload(false);
    }

    const UpdateFooter = (event) => {
        event.preventDefault();
        editFooter(editFooterData, headers)
            .then(() => {
                alert("Footer updated sucessfully");
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <Modal.Header className='modal-header' closeButton>
                <Modal.Title className="text-white" style={{ paddingLeft: 150 }}>Update Footer</Modal.Title>
            </Modal.Header>
            <form onSubmit={UpdateFooter}>
                <Modal.Body>
                <label htmlFor="oldcategory" className='fs-5 mb-2'>Title</label>
                    <input className="w-100 mb-2 input" type="text" name="title" value={editFooterData.title}
                        placeholder='Enter Category' onChange={handleFooterDetails}
                        required readOnly/><br />
                    <label htmlFor="newcategory" className='fs-5 mb-2'>Description</label>
                    <textarea className="mb-2 textarea" name="matter" id="matter" cols="60" rows="5"
                    onChange={handleFooterDetails} value={editFooterData.matter} placeholder='Enter Description' required></textarea>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Update Footer
                    </Button>
                </Modal.Footer>
            </form>
        </>
    );
}

export default EditFooter;