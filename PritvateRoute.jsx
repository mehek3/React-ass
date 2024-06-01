import React, { useContext } from 'react'
import { AuthContext } from './AuthContextProvider'
import { Navigate } from 'react-router-dom'
const PrivateRoute = ({children}) => {
  const {AuthState}=useContext(AuthContext)
  
  if(window.localStorage.getItem("isLoggedIn")){
    AuthState.isAuth=true
  }
  
  if(!AuthState.isAuth){
    return <Navigate to="/login"/>
  }
 
    
    return<>{children}</>
   
  
}

export default PrivateRoute