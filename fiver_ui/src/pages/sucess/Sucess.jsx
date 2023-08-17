import React, { useEffect } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import newRequest from "../../utils/newRequest"
const Sucess = () => {
  const {search} = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(search)
  const payment_intent = params.get("payment_intent")
  
  useEffect(()=>{
    const makeRequest = async ()=>{
      try {
        await newRequest.put(`/orders`,{payment_intent})
        setTimeout(()=>{
          navigate('/orders')
        },5000)
      } catch (error) {
        console.log(error);
      }
    }
    makeRequest()
  },[])
  return (
    <div>
      Payment Successfull . You are being redirected to order page.
      Please don't close it.
    </div>
  )
}

export default Sucess