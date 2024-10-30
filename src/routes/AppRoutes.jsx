//eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from '../components/Register';
import Login from '../components/Login';
import Home from '../components/Home';
import Crud from '../components/Crud';
import ProductDetail from '../components/ProductDetail';
import Collections from '../components/Collections';
import Shop from '../components/Shop';


// const PrivateRoute = ({ element }) => {
//     const isAuthenticated = Boolean(localStorage.getItem('user')); 
//     return isAuthenticated ? element : <Navigate to="/login"  />;
//   };

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
    {/* <Route path='/' element={<PrivateRoute element={<Home/>}/>}/> */}
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/collectionDetail/:id" element={<ProductDetail/>} />
    <Route path="/collections" element={<Collections/>} />
    <Route path="/shop" element={<Shop/>} />
    <Route path="/crud" element={<Crud/>} />
    
    {/* <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
    <Route path='/shop' element={<PrivateRoute element={<Home/>}/>}/>
    <Route path='/collections' element={<PrivateRoute element={<Home/>}/>}/> */}
    
    
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes