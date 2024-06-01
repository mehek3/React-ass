import React, { useEffect, useState } from 'react'

const Cart = () => {

  const[Cartdata,setCartData]=useState([])
  const[Total,setTotal]=useState(0)
   function  fetchCart(){
   let CartStorage=JSON.parse(localStorage.getItem("product"))
   setCartData(CartStorage)
   let sum=0
   CartStorage.map((item)=>{
    sum+=item.price*item.quantity
   })
   setTotal(parseFloat(sum).toFixed(2))
   console.log(CartStorage)
   }

   function Decrease(Id){
    
    let req=Cartdata.find((item)=>{
     return item.id==Id
   })
   let index=Cartdata.findIndex(item => item.id==Id)
   if(req.quantity==1){
    alert("Want to remove item from Cart?")
    Cartdata.splice(index,1)
    localStorage.setItem("product",JSON.stringify(Cartdata))
    
  }
  else{
    let quan=req.quantity-1
    let obj={...req,quantity:quan}
    Cartdata.splice(index,1,obj)
    localStorage.setItem("product",JSON.stringify(Cartdata))
     
  }
  fetchCart()
   }

   function Increase(Id){
    
     let req=Cartdata.find((item)=>{
      return item.id==Id
    })
    let quan=req.quantity+1
    let obj={...req,quantity:quan}
    
    let index=Cartdata.findIndex(item => item.id===Id)
    Cartdata.splice(index,1,obj)
    localStorage.setItem("product",JSON.stringify(Cartdata))
     fetchCart()
   }


   useEffect(()=>{
     fetchCart()
   },[])
  return <>
    <div><h1>Total Price:{Total}</h1></div>
    {Cartdata && Cartdata.map((item)=>{
     return <div className="card" key={item.id}>
        <div><img src={item.image} alt={item.title}/></div>
        <div>
            <h2>{item.title}</h2>
            
            <h4>Price :  {item.price}</h4>
            
            <div>
            <button onClick={()=>Decrease(item.id)}>-</button>
            <button >{item.quantity}</button>
            <button onClick={()=>Increase(item.id)}>+</button>
            </div>
        </div>
    </div>})}
    </>
  
}

export default Cart