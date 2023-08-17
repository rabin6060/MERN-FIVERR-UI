import { useQuery } from '@tanstack/react-query'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import newRequest from '../../utils/newRequest'
import "./orders.scss"
const Orders =  () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate()
  const {isloading,error,data} = useQuery({
    queryKey:["orders"],
    queryFn:()=>
    newRequest
    .get( `/orders`)
    .then((res)=>{
      return res.data
    })
  })

  const handleContact = async (order) => {
    const sellerId = order.sellerId
    const buyerId = order.buyerId
    const id = sellerId + buyerId
    try {
      const res = await newRequest.get(`/conversations/single/${id}`)
      navigate(`/message/${res.data.id}`)
    } catch (error) {
      if(error.response.status===404) {
        const res = await newRequest.post(`/conversations`,{to:currentUser.isSeller? sellerId : buyerId})
        navigate(`/message/${res.data.id}`)
      }
    }
    
  }

  if(isloading) return "loading..."
  if(error) return "error is"+error.message
  
  return (
    <div className='orders'>
     {data && 
      <div className="container">
        <div className="title">
          <h2>Orders</h2>
        </div>
        <table>
          <tr>
            <th>Images</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          {
            data.map(order=>(
              <tr key={order._id}>
                <td>
                  <img src={order.img} />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img className='delete' src="/img/message.png" onClick={()=>handleContact(order)}/>
                </td>
              </tr>
            ))
          }
        </table>
      </div>}
    </div>
  )
}

export default Orders