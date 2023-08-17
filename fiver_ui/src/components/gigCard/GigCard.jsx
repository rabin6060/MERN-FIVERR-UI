import { useQuery } from '@tanstack/react-query'
import React from 'react'
import {Link} from 'react-router-dom'
import newRequest from '../../utils/newRequest'
import './gigcard.scss'
const GigCard = ({item}) => {
    const {isloading,error,data} = useQuery({
        queryKey:["gigUser"],
        queryFn:()=>
        newRequest
        .get( `/users/${item.userId}`)
        .then((res)=>{
          return res.data
        })
      })

  return (
    <Link to={`/gig/${item._id}`} className='link'>
        <div className='gigcard'>
            <img src={item.cover} />
            <div className="info">
                {isloading
                ? ("loading")
                : error
                ? ("something went wrong")
                :(<div className="user">
                    <img src={data?.img || "./img/noavatar.jpg"} />
                    <span>{item.username}</span>
                  </div>)}
                <p>{item.desc}</p>
                <div className="rating">
                    <img src="./img/star.png" />
                    <span>{!isNaN(item.totalStars/item.starNumber) && Math.round(item.totalStars/item.starNumber)}</span>
                </div>
                
            </div>
            <hr />
            <div className="detail">
                    <img src="./img/heart.png"  />
                    <div className="price">
                        <span>Starring at</span>
                        <h2>$ {item.price}</h2>
                    </div>
            </div>
        </div>
    </Link>
  )
}

export default GigCard