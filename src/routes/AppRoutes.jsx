//eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Register from '../components/Register';
import Login from '../components/Login';
import Home from '../components/Home';
import Crud from '../components/Crud';
import ProductDetail from '../components/ProductDetail';
import Collections from '../components/Collections';
import Shop from '../components/Shop';
import Carrito from '../components/Carrito';
import Profile from '../components/Profile';


// eslint-disable-next-line react/prop-types
const AdminRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem('user')); 
    const isAdmin = user && user.role === 'admin';
  
    return isAdmin ? element : <Navigate to="/home" replace />; 
  };

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
    
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/collectionDetail/:id" element={<ProductDetail/>} />
    <Route path="/collections" element={<Collections/>} />
    <Route path="/shop" element={<Shop/>} />
    <Route path="/crud" element={<AdminRoute element={<Crud />} />} />
    <Route path="/cart" element={<Carrito/>} />
    <Route path="/profile" element={<Profile/>} />
    
    
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes