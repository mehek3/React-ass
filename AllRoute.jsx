import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Products from './Products'
import SingleProduct from './SingleProduct'
import PrivateRoute from '../Components/PrivateRoute'
import Cart from './Cart'

const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/"  element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/products" element={<PrivateRoute><Products/></PrivateRoute>}/>
        <Route path="/products/:Id" element={<PrivateRoute><SingleProduct/></PrivateRoute>}/>
        <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>}/>
    </Routes>
    </>
  )
}

export default AllRoutes