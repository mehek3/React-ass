import React, { useContext, useState } from 'react'
import { AuthContext } from '../Components/AuthContextProvider';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

const  { authState, loginUser,logoutUser }=useContext(AuthContext)
const [form,setForm]=useState({email:"",password:""});
const navigate=useNavigate()

function handleChange(e){
  const {type,value}=e.target;
  const newForm={...form,[type]:value}
  setForm(newForm)
}
 async function handleSubmit(e){
  e.preventDefault();
   try {
     let res=await fetch('https://reqres.in/api/login',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
     })
     let finalres=await res.json()
     if(res.ok){
        loginUser(finalres.token)
        window.localStorage.setItem("isLoggedIn",true)
        navigate('/')
     }
   } catch (error) {
    console.log(error)
   }
}
  return (
    <div>
        <form  onSubmit={handleSubmit} className="Form">
        <div>
          <label>
            Email <br />
            <input  type="email" placeholder="email" onChange={handleChange} value={form.email}/>
          </label>
        </div>
        <div>
          <label>
            Password <br />
            <input
              data-testid="password-input"
              type="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <input  type="submit" value="SUBMIT"/>
        </div>
      </form>
      <div>
        <Link to="/" className="go_back">Go Back</Link>
      </div>
    </div>
  )
}

export default Login