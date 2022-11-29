import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Pagination from './Pagination';
import { getAllPromoCode } from '../getData/getdata';
import { addPromoCode, deletePromoCode} from '../postData/postdata';
import { headers } from '../Header';
import { MdShoppingBag, MdDelete } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { Button, Modal } from "react-bootstrap";
import EditPromoCode from './EditPromoCode';
import { baseUrl } from '../baseUrl';
import '../styles/manageProduct.css';

const PromoCode = () => {
    const [promocodeList, setPromocodeList] = useState([]);
    const [promocodeData, setPromocodeData] = useState({ image: "" });
    const [promocodeModal, setPromoCodeModal] = useState(false);
    const [editPromoCodeModal, setEditPromoCodeModal] = useState(false);
    const [searchPromoCode, setSearchPromoCode] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = promocodeList.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(promocodeList.length / recordsPerPage)
    const formdata = new FormData();
    const handlePromoCode = () => setPromoCodeModal(true);
    const handleEditPromoCode = (id) => setEditPromoCodeModal(id);

    useEffect(() => {
        getAllPromoCode()
            .then((response) => {
                setPromocodeList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleImage = (event) => {
        setPromocodeData({
            ...promocodeData,
            image: event.target.files[0]
        })
    }

    const AddBanner = (event) => {
        event.preventDefault();
        formdata.append('image', promocodeData.image)
        addPromoCode(formdata, headers)
            .then(() => {
                alert("PromoCode created successfully");
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })

    }


    const DeleteBanner = (banner_id) => {
        const payload = {
            id: banner_id
        }
        deletePromoCode(payload, headers)
            .then(() => {
                alert("PromoCode deleted successfully");
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <Sidebar />
            <div className="content">
                <div className="row mt-4 mb-4">
                    <div className="col-md-10 col-lg-11">
                        <input className="w-100 ps-3 search-input" type="text" name="Search"
                            placeholder='Enter your Category Name'
                            onChange={(e) => setSearchPromoCode(e.target.value)} />
                        <BsSearch className='search-icon' />
                    </div>

                    <div className="col-md-2 col-lg-1">
                        <MdShoppingBag className="shopping-bag" style={{ width: 50, height: 40 }} />
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xs-6 col-md-9 col-lg-10">
                                <h4>Add PromoCode</h4>

                            </div>
                            <div className="col-xs-6 col-md-3 col-lg-2">
                                <Button style={{ marginLeft: 0, backgroundColor: "orange", fontWeight: "bold" }}
                                    onClick={handlePromoCode}
                                    className="border border-warning w-100 py-2 fs-5"
                                >ADD MORE</Button>
                                <Modal show={promocodeModal} onHide={() => setPromoCodeModal(false)}>
                                    <Modal.Header className='modal-header' closeButton>
                                        <Modal.Title className="text-white" style={{ paddingLeft: 150 }}>
                                            Add PromoCode</Modal.Title>
                                    </Modal.Header>
                                    <form onSubmit={AddBanner}>
                                        <Modal.Body>
                                            <label htmlFor="category" className='fs-5 mb-2'>Banner Image</label>
                                            <input className="w-100 mb-2" type="file" name="image" accept="image/*"
                                                onChange={handleImage} required /><br />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setPromoCodeModal(false)}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" variant="primary">
                                                Add PromoCode
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                        <div className="card mt-5 mb-3">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">PromoCode</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {/* <tbody>
                                    {currentRecords.filter((val) => {
                                        return val.category.toLowerCase().includes(searchPromoCode.toLowerCase())
                                    }).map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className='action-width' style={{ width: 500 }}>
                                                    <img className='product-image' src={`${baseUrl}${item.image}`}
                                                        alt="bannerImage" />
                                                </td>
                                                <td>
                                                    <button className="btn btn-primary px-3 pb-2" onClick={() => {
                                                        handleEditPromoCode(item._id)
                                                        setPromocodeData(item)
                                                    }}><FiEdit />
                                                    </button>
                                                    <button className="btn btn-primary px-3 pb-2 ms-2" onClick={() =>
                                                        DeleteBanner(item._id)}>
                                                        <MdDelete />
                                                    </button>
                                                </td>
                                                <Modal show={editPromoCodeModal === item._id ? true : false} 
                                                onHide={() => setEditPromoCodeModal(false)}>
                                                    <EditPromoCode data={promocodeData} />
                                                </Modal>
                                            </tr>
                                        )
                                    })}
                                </tbody> */}
                            </table>
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

export default PromoCode;
