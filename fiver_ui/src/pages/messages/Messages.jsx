import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import {Link} from "react-router-dom"
import newRequest from '../../utils/newRequest'
import moment from 'moment'
import "./messages.scss"
const Messages = () => {
  const queryClient = useQueryClient()
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const {isloading,error,data} = useQuery({
    queryKey:["messages"],
    queryFn:()=>
    newRequest
    .get( `/conversations`)
    .then((res)=>{
      return res.data
    })
  })
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["conversations"])
    }
  })
  const handleRead = (id) => {
    mutation.mutate(id)
  }
  if(isloading) return "loading..."
  if(error) return "error is "
  return (
    <div className='messages'>
     {data && 
      <div className="container">
        <div className="title">
          <h2>Orders</h2>
        </div>
        <table>
          <tr>
            <th>{currentUser.isSeller ? "Seller" : "Buyer"}</th>
            <th>Last Messages</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {
            data?.map(c=>(
              <tr className={((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer )) && "active"} key={c?.id}>
                <td>
                  {currentUser.isSeller? c.buyerId:c.sellerId}
                </td>
                <td>
                  <Link to={`/message/${c.id}`} className='link'>
                    {c?.lastMessage?.substring(0,100)}...
                  </Link>
                </td>
                <td>{moment(c?.updatedAt).fromNow()}</td>
                <td>
                  { ((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer )) && 
                    (<button onClick={()=>handleRead(c.id)}>Mark as read</button>)}
                </td>
              </tr>
            ))
          }

        </table>
      </div>}
    </div>
  )
}

export default Messages