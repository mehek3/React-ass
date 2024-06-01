import React, { useEffect, useState } from 'react'
import Product from '../Components/Product'
import { Link, useSearchParams } from 'react-router-dom'
import axios from "axios"
import { useReducer } from 'react'
import Loading from '../Components/Loading'
import Error from '../Components/Error'
import "./products.css"
import Navbar from '../Components/navbar'

const reducer =(state,{type,payload})=>{
  switch (type){
    case "LOADING":return {...state,loading:true}
    case "ERROR": return {...state,loading:false,error:true}
    case "SUCCESS": return {...state,loading:false,error:false,data:payload}
    default :return state
  }
}

const Products = () => {
  const [state,dispatch]=useReducer(reducer,{
    loading:false,
    error:false,
    data:[]
  })
  const[searchParam,setSearchParam]=useSearchParams()
  const[category,setCategory]=useState(searchParam.get("category")||"all")
  

  
  async function fetchData(Category){
    dispatch({type:"LOADING"})
    const categoryObj={};
    if(Category!=="all"){
       categoryObj["category"]=Category
    }
    try {
      let {data}=await axios({
        baseURL:"https://fakestoreapi.com",
        url:"/products",
        method:"Get",
        params:categoryObj
      })
      
      dispatch({type:"SUCCESS",payload:data})
    } catch (error) {
      dispatch({type:"ERROR"})
    }
  }
  
  
  useEffect(()=>{
    
    setSearchParam((prevSearchParam)=>{
      const newSearchParam= new URLSearchParams(prevSearchParam);
      newSearchParam.set("category",category)
      return newSearchParam
    })
    fetchData(category)
    
   },[category])
   
   if(state.loading){
    return <Loading/>
   }

   if(state.error){
    return <Error/>
   }

  return (
    <>
     <Navbar/>
     <select  value={category} onChange={(e)=>{setCategory(e.target.value)}}>
     
        <option value="all">All</option>
        <option value="men's clothing">men's clothing</option>
        <option value="jewelery">jewellery</option>
        <option value="electronics">electronics</option>
        <option value="women's clothing">women's clothing</option>
     </select>
     <div  className='grid'>{state.data && state.data.map((item) => {
         return <Product {...item} key={item.id} />
     })}
      </div>
    </>
  )
}

export default Products