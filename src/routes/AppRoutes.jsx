//eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Register from '../components/Register';
import Login from '../components/Login';
import Home from '../components/Home';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element }) => {
    const isAuthenticated = Boolean(localStorage.getItem('user')); 
    return isAuthenticated ? element : <Navigate to="/login"  />;
  };

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path='/' element={<PrivateRoute element={<Home/>}/>}/>
    
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes