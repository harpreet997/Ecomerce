import { Route, Routes } from 'react-router-dom';
import Category from './Category';
import Dashboard from './Dashboard';
import ManageProducts from './ManageProducts';
import Product from './Product';
import SubCategory from './SubCategory';

const MainLayout = () => {
   
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route exact path="/manage-products" element={<ManageProducts />} />
            <Route path="/category" element={<Category/>} />
            <Route path="/subcategory" element={<SubCategory/>} />
            <Route path="/product" element={<Product/>} />      
        </Routes>
    );
}

export default MainLayout;