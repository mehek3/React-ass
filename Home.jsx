import React, { useContext, useState } from 'react'
import Navbar from '../Components/navbar'
import { useNavigate,Navigate } from 'react-router-dom'
import { AuthContext } from '../Components/AuthContextProvider'

const Home = () => {
  const [state,setstate]=useState(false)
  const navigate=useNavigate();
  function handleclick(){
   setstate(true)
    
  }
  return (
    <>
    <Navbar/>
    <div style={{width:"80%",margin:"auto" ,textAlign:"center"}}>
       <h1>Welcome To your Fav shopping website</h1>
       <button onClick={()=>{navigate("/products")}}>Navigate To Products Page using useNavigate</button>
       <button onClick={handleclick}>Navigate To Products Page using Navigate Component</button>
       {state && <Navigate to="/products"/>}
    </div>

    </>
  )
}

export default Home