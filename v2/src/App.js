import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import RequiredUser from './components/RequiredUser';
import ProductList from './views/prouduct/ProductList';
import ProductCreate from './views/prouduct/ProductCreate';
import ProductEdit from './views/prouduct/ProductEdit';
import Client from './views/client/Client';
import BuyProduct from './views/client/BuyProduct';
import PurchaseList from './views/purchase/PurchaseList';
import CustomerBuyProduct from './views/prouduct/CustomerBuyProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerEdit from './views/client/CustomerEdit';

function App() {
  return (
    <Suspense fallback={null}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {/* Private Route */}
          <Route element={<RequiredUser allowedRoles={['user', 'admin']} />}>
            <Route path='products' element={<ProductList />} />
            <Route path='product/create' element={<ProductCreate />} />
            <Route path='product/edit/:id' element={<ProductEdit />} />
            <Route path='customer/edit/:id' element={<CustomerEdit />} />
            <Route path='customers' element={<Client />} />
            <Route path='purchases' element={<PurchaseList />} />
            <Route path='customer/buyProduct' element={<BuyProduct />} />
            <Route path='customer/buy/:customerId' element={<CustomerBuyProduct />} />
          </Route>
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </Suspense>
  );
}

export default App;
