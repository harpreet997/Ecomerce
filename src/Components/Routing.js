import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import ManageProducts from './ManageProducts';

const Routing = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/manage-products" element={<ManageProducts />} />
        </Routes>
    );
}

export default Routing;