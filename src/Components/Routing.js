import { Route, Routes } from 'react-router-dom';
import Category from './Category';
import Dashboard from './Dashboard';
import Login from './Login';
import Product from './Product';
import SubCategory from './SubCategory';
import PageNotFound from './PageNotFound';
import Unauthorize from './Unauthorize';
const Routing = ({headers}) => {
    
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={headers === "null" ? <Unauthorize/> : <Dashboard/> } />
            <Route path="/category" element={headers === "null" ? <Unauthorize/> :<Category/>} />
            <Route path="/subcategory" element={headers === "null" ? <Unauthorize/> :<SubCategory/>} />
            <Route path="/product" element={headers === "null" ? <Unauthorize/> :<Product/>} />
            <Route path="*" element={<PageNotFound/>} />        
        </Routes>
    );
}

export default Routing;