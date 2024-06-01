import React, { useEffect, useReducer, useState } from 'react'
import Loading from '../Components/Loading'
import Error from '../Components/Error'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const reducer =(state,{type,payload})=>{
  switch (type){
    case "LOADING":return {...state,loading:true}
    case "ERROR": return {...state,loading:false,error:true}
    case "SUCCESS": return {...state,loading:false,error:false,data:payload}
    default :return state
  }
}


const SingleProduct = () => {
  const{Id}=useParams()
  const[Text,setText]=useState(false)
  const[ItemPresent,setItemPresent]=useState(false)
  const navigate=useNavigate()
  const [state,dispatch]=useReducer(reducer,{
    loading:false,
    error:false,
    data:{}
  })
  
  
  async function fetchData(){
    dispatch({type:"LOADING"})
    try {
      let {data}=await axios.get(`https://fakestoreapi.com/products/${Id}`)
      
      dispatch({type:"SUCCESS",payload:data})
    } catch (error) {
      dispatch({type:"ERROR"})
    }
  }
  
  
  

   const{id ,image,price,title,rating,description}=state.data
   function TextOption(){
   let Cart=localStorage.getItem("product")?JSON.parse(localStorage.getItem("product")):null;
    if(Cart==null){
      Cart=[]
      localStorage.setItem("product",JSON.stringify(Cart))
    }

    let ItemExisting=Cart.find(item=>{
       return item.id==+Id
      
    })
    if(ItemExisting){
      setText(true)
      setItemPresent(true)
      console.log(ItemExisting)
    }
  }
  
   function AddToCart(){
    
    
    if (ItemPresent){
      navigate("/cart")
    }
    else{
      let Cart=JSON.parse(localStorage.getItem("product"))
      let obj={...state.data,quantity:1}
      Cart.push(obj)
      localStorage.setItem("product",JSON.stringify(Cart))
      TextOption()
    }
   }
   
   useEffect(()=>{
    fetchData()
    TextOption()
   },[Text])
    
   
   if(state.loading){
    return <Loading/>
   }

   if(state.error){
    return <Error/>
   }

  return (
    <div className="card">
        <div><img src={image} alt={title}/></div>
        <div>
            <h2>{title}</h2>
            <h3>{description}</h3>
            <h4>Price :  {price}</h4>
            <p> Ratings: {rating?.rate}</p>
            
            <button onClick={AddToCart}>{Text?"Go To Cart":"Add To Cart"}</button>
        </div>
    </div>
  )
}

export default SingleProduct