import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import {Link} from "react-router-dom"
import newRequest from '../../utils/newRequest'
import "./mygigs.scss"
const MyGigs = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const queryClient = useQueryClient()
  const {isloading,error,data} = useQuery({
    queryKey:["myGigs"],
    queryFn:()=>
    newRequest
    .get( `/gigs?userId=${currentUser.id}`)
    .then((res)=>{
      return res.data
    })
  })
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`, id)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["myGigs"])
    }
  })

  const handleDelete = (id)=>{
    mutation.mutate(id)
  }


  if(isloading) return "loading.."
  if(error) return "an error occured"+error.message

  return (
    <div className='mygigs'>
      {data && 
      <div className="container">
        <div className="title">
          <h2>Gigs</h2>
          <Link to="/add" className='link'>
            <button>Add New Gig</button>
          </Link>
        </div>
        <table>
          <tr>
            <th>Images</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Actions</th>
          </tr>
          {
            data?.map(g=>(
              <tr key={g._id}>
                <td>
                  <img src={g.cover} />
                </td>
                <td>{g.title}</td>
                <td>{g.price}</td>
                <td>{g.sales}</td>
                <td>
                  <img className='delete' src="/img/delete.png" onClick={()=>handleDelete(g._id)} />
                </td>
              </tr>
            ))
          }
         
        </table>
      </div>}
    </div>
  )
}

export default MyGigs