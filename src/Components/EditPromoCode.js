import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { editPromocode } from "../postData/postdata";
import { headers } from "../Header";
import { baseUrl } from "../baseUrl";

const EditPromoCode = ({ data }) => {
    const [editPromoCode, setEditPromoCode] = useState({
        image: data.image,
        id: data._id
    })
    const formdata = new FormData();

    const handleImage = (event) => {
        setEditPromoCode({
            ...editPromoCode,
            image: event.target.files[0]
        })
    }

    const UpdatePromoCode = (event) => {
        event.preventDefault();
        formdata.append('image', editPromoCode.image)
        formdata.append('_id', editPromoCode.id)
        editPromocode(formdata, headers)
            .then(() => {
                alert("Promocode updated sucessfully");
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
            <Modal.Header className='modal-header' closeButton>
                <Modal.Title className="text-white" style={{ paddingLeft: 150 }}>Update PromoCode</Modal.Title>
            </Modal.Header>
            <form onSubmit={UpdatePromoCode}>
                <Modal.Body>
                    <label htmlFor="bannerImage" className='fs-5 mb-2'>New Banner</label>
                    <input className="w-100 mb-2" type="file" name="image" accept="image/*" placeholder='Select Image'
                        onChange={handleImage} /><br />
                    <img className='product-image' src={`${baseUrl}${data.image}`}
                        alt="bannerImage" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Update PromoCode
                    </Button>
                </Modal.Footer>
            </form>
        </>
    );
}

export default EditPromoCode;