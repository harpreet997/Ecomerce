import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { editPromocode } from "../postData/postdata";
import { headers } from "../Header";

const EditPromoCode = ({ data }) => {
    const [editPromoCode, setEditPromoCode] = useState({
        coupon: data.coupon,
        percentage: data.percentage,
        maxAmount: data.maxAmount,
        expiry: data.expiry.substring(0, 10),
        id: data._id
    })


    const handlePromoDetails = (event) => {
        setEditPromoCode({
            ...editPromoCode,
            [event.target.name]: event.target.value
        })
    }

    const UpdatePromoCode = (event) => {
        event.preventDefault();

        editPromocode(editPromoCode, headers)
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
                    <label htmlFor="productName" className='fs-5 mb-2'>PromoCode</label><br />
                    <input className="w-100 mb-2 input" type="text" name="coupon"
                        value={editPromoCode.coupon} placeholder='Enter PromoCode'
                        onChange={handlePromoDetails} readOnly /><br />
                    <label htmlFor="quantity" className='fs-5 mb-2'>Percentage</label><br />
                    <input className="w-100 mb-2 input" type="number" min={1} step={0.1} name="percentage"
                        value={editPromoCode.percentage}
                        placeholder='Enter Percentage'
                        onChange={handlePromoDetails} required /><br />
                    <label htmlFor="quantity" className='fs-5 mb-2'>Amount</label><br />
                    <input className="w-100 mb-2 input" type="number" min={1} name="maxAmount"
                        value={editPromoCode.maxAmount} placeholder='Enter Amount'
                        onChange={handlePromoDetails} required /><br />
                    <label htmlFor="productName" className='fs-5 mb-2'>Expire Date</label><br />
                    <input className="w-100 mb-2 input" type="date" name="expiry"
                        value={editPromoCode.expiry} placeholder='Enter Expire Date'
                        onChange={handlePromoDetails} required /><br />
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