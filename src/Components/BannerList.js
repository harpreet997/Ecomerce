import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Pagination from './Pagination';
import { getAllBanner } from '../getData/getdata';
import { addBanner } from '../postData/postdata';
import { deleteBanner } from '../postData/postdata';
import { headers } from '../Header';
import { MdShoppingBag } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { Button, Modal } from "react-bootstrap";
import '../styles/manageProduct.css';
import EditBanner from './EditBanner';
import { baseUrl } from '../baseUrl';

const BannerList = () => {
    const [bannerlist, setBannerlist] = useState([]);
    const [bannerdata, setBannerData] = useState({ image: "" });
    const [categoryModal, setCategoryModal] = useState(false);
    const [editcategoryModal, setEditCategoryModal] = useState(false);
    const [searchProduct, setSearchProduct] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = bannerlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(bannerlist.length / recordsPerPage)
    const formdata = new FormData();
    const handleCategory = () => setCategoryModal(true);
    const handleEditCategory = (id) => setEditCategoryModal(id);

    useEffect(() => {
        getAllBanner()
            .then((response) => {
                setBannerlist(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleImage = (event) => {
        setBannerData({
            ...bannerdata,
            image: event.target.files[0]
        })
    }

    const AddBanner = (event) => {
        event.preventDefault();
        formdata.append('image', bannerdata.image)
        addBanner(formdata, headers)
            .then(() => {
                alert("Banner created successfully");
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
        deleteBanner(payload, headers)
            .then(() => {
                alert("Banner deleted successfully");
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
                            onChange={(e) => setSearchProduct(e.target.value)} />
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
                                <h4>Add Banner</h4>

                            </div>
                            <div className="col-xs-6 col-md-3 col-lg-2">
                                <Button style={{ marginLeft: 0, backgroundColor: "orange", fontWeight: "bold" }}
                                    onClick={handleCategory}
                                    className="border border-warning w-100 py-2 fs-5"
                                >ADD MORE</Button>
                                <Modal show={categoryModal} onHide={() => setCategoryModal(false)}>
                                    <Modal.Header className='modal-header' closeButton>
                                        <Modal.Title className="text-white" style={{ paddingLeft: 150 }}>
                                            Add Banner</Modal.Title>
                                    </Modal.Header>
                                    <form onSubmit={AddBanner}>
                                        <Modal.Body>
                                            <label htmlFor="category" className='fs-5 mb-2'>Banner Image</label>
                                            <input className="w-100 mb-2" type="file" name="image" accept="image/*"
                                                onChange={handleImage} required /><br />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setCategoryModal(false)}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" variant="primary">
                                                Add Banner
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
                                        <th scope="col">Banner</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRecords.filter((val) => {
                                        if (searchProduct === "") {
                                            return val;
                                        }
                                        else if (val.category.toLowerCase().includes(searchProduct.toLowerCase())) {
                                            return val;
                                        }
                                    }).map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className='action-width' style={{ width: 500 }}>
                                                    <img className='product-image' src={`${baseUrl}${item.image}`}
                                                        alt="bannerImage" />
                                                </td>
                                                <td>
                                                    <button className="btn btn-primary px-3 pb-2" onClick={() => {
                                                        handleEditCategory(item._id)
                                                        setBannerData(item)
                                                    }}><FiEdit />
                                                    </button>
                                                    <button className="btn btn-primary px-3 pb-2 ms-2" onClick={() =>
                                                        DeleteBanner(item._id)}>
                                                        <MdDelete />
                                                    </button>
                                                </td>
                                                <Modal show={editcategoryModal === item._id ? true : false} onHide={() => setEditCategoryModal(false)}>
                                                    <EditBanner data={bannerdata} />
                                                </Modal>
                                            </tr>
                                        )
                                    })}
                                </tbody>
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

export default BannerList;
