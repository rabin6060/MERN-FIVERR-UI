import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import {Link, useParams} from "react-router-dom"
import newRequest from '../../utils/newRequest'
import './message.scss'
const Message = () => {
  const {id} = useParams()
  const queryClient = useQueryClient()
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const {isloading,error,data} = useQuery({
    queryKey:["message"],
    queryFn:()=>
    newRequest
    .get( `/messages/${id}`)
    .then((res)=>{
      return res.data
    })
  })
  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`,message)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["message"])
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({
      conversationId:id,
      desc:e.target[0].value
    })
    e.target[0].value=""
  }
  
  if(isloading) return "loading..."
  if(error) return "error is "+error.message
  return (
    <div className='message'>
      <div className="container">
        <div className="breadcrumbs">
          <Link to='/messages' className='link'>MESSAGES</Link>/JOHN DOE/
        </div>
        {data && 
        <div className="messages">
          { data.map(m=>(
            <div className={m.userId === currentUser._id ? "item owner" : "item"} key={m._id}>
              <img src="/img/man.png" />
              <p>
                {m.desc}
              </p>
            </div>
          ))
            }
        </div>}
        <hr />
        <form className="writemessage" onSubmit={handleSubmit}>
          <textarea placeholder='write a message' rows="5"></textarea>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Message