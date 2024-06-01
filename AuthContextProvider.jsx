import React, { createContext, useState } from 'react'
export const AuthContext=createContext('')

const AuthContextProvider = ({children}) => {
    const [AuthState,setAuthState]=useState({isAuth:false,token:null})
    
    function loginUser(value) {
  
      setAuthState({isAuth:true,token:value})
     }
     function logoutUser(params) {
      setAuthState({isAuth:false,token:null})
     }
  return (
    <AuthContext.Provider value={ {AuthState, loginUser,logoutUser }}>
       {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider