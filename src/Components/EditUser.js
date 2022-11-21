import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { editCategory } from "../postData/postdata";
import { headers } from "../Header";

const EditUser = ({ data }) => {
    
    const [userdata, setUserData] = useState(
        {
            name: data.name,
            email: data.email,
            mobile: data.mobile,
        }
    );
    const handleUserDetails = (event) => {
        setUserData({
            ...userdata,
            [event.target.name]: event.target.value
        })
    }

    const handleClose = () => {
        window.location.reload(false);
    }

    const UpdateUser = (event) => {
        event.preventDefault();
        editCategory(userdata, headers)
            .then(() => {
                alert("Category updated sucessfully");
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <Modal.Header className='modal-header' closeButton>
                <Modal.Title className="text-white" style={{ paddingLeft: 150 }}>Update User</Modal.Title>
            </Modal.Header>
            <form onSubmit={UpdateUser}>
                                        <Modal.Body>
                                            <label htmlFor="category" className='fs-5 mb-2'>Name</label>
                                            <input className="w-100 mb-2 input" type="text" name="name"
                                                placeholder='Enter Name' value={userdata.name}
                                                onChange={handleUserDetails} required /><br />
                                            <label htmlFor="category" className='fs-5 mb-2'>Email Address</label>
                                            <input className="w-100 mb-2 input" type="email" name="email"
                                                placeholder='Enter Email' value={userdata.email} readOnly
                                                onChange={handleUserDetails} required /><br />
                                            <label htmlFor="category" className='fs-5 mb-2'>Contact Number</label>
                                            <input className="w-100 mb-2 input" type="tel" name="mobile" pattern="[0-9]{5}[0-9]{5}"
                                                placeholder='1234567890' value={userdata.mobile}
                                                onChange={handleUserDetails} required /><br />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary">
                                                Cancel
                                            </Button>
                                            <Button type="submit" variant="primary">
                                                Update User
                                            </Button>
                                        </Modal.Footer>
                                    </form>
        </>
    );
}

export default EditUser;