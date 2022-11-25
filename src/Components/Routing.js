import { Route, Routes } from 'react-router-dom';
import Category from './Category';
import Dashboard from './Dashboard';
import Login from './Login';
import Product from './Product';
import SubCategory from './SubCategory';
import PageNotFound from './PageNotFound';
import Unauthorize from './Unauthorize';
import UsersList from './UsersList';
import BannerList from './BannerList';
import PromoCode from './PromoCode';
import Footer from './Footer';
import Menu from './Menu';
const Routing = () => {

    let headers = {
        authorization: `${localStorage.getItem('token')}`
      }
    
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={headers.authorization === "null" ? <Unauthorize/> : <Dashboard/> } />
            <Route path="/category" element={headers.authorization === "null" ? <Unauthorize/> :<Category/>} />
            <Route path="/subcategory" element={headers.authorization === "null" ? <Unauthorize/> :<SubCategory/>} />
            <Route path="/product" element={headers.authorization === "null" ? <Unauthorize/> :<Product/>} />
            <Route path="/users" element={headers.authorization === "null" ? <Unauthorize/> :<UsersList/>} />
            <Route path="/banners" element={headers.authorization === "null" ? <Unauthorize/> :<BannerList/>} />
            <Route path="/promo" element={headers.authorization === "null" ? <Unauthorize/> :<PromoCode/>} />
            <Route path="/footer" element={headers.authorization === "null" ? <Unauthorize/> :<Footer/>} />
            <Route path="/menu" element={headers.authorization === "null" ? <Unauthorize/> :<Menu/>} />
            <Route path="*" element={<PageNotFound/>} />        
        </Routes>
    );
}

export default Routing;