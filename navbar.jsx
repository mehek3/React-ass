import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './AuthContextProvider'

const Navbar = () => {
  const {AuthState ,logoutUser}=useContext(AuthContext)
   function handleclick(){
    logoutUser()

    window.localStorage.removeItem("isLoggedIn")
   }
  return (
    <div style={{width:"90%",margin:"auto",textDecoration:"none",display:"flex",justifyContent:"space-between"}}>
         <Link to="/">Home</Link>
         <Link to="/login">Login</Link>
         <Link to="/products">Products</Link>
         <button onClick={handleclick}>Logout</button>
    </div>
  )
}

export default Navbar