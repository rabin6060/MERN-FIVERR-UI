import { useQuery } from '@tanstack/react-query'
import React from 'react'
import newRequest from '../../utils/newRequest'
import './review.scss'
const Review = ({review}) => {
  const {isloading,error,data} = useQuery({
    queryKey:[review.userId],
    queryFn:()=>
    newRequest
    .get( `/users/${review.userId}`)
    .then((res)=>{
      return res.data
    })
  })
  if(isloading) return "loading.."
  if(error) return "an error occured"+error.message
  return (
    <div className="review">
                <div className="user">
                  <img className='userpp' src={data?.img || "/img/noavatar.jpg"}/>
                  <div className="info">
                    <span>{data?.username}</span>
                    <div className="country">
                      <img class="country-flag" src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png" alt="US" loading="lazy"/>
                      <span>{data?.country}</span>
                    </div>
                  </div>
                </div>
                <div className="stars">
                  {Array(review?.star).fill().map((item,i)=>
                    <img src="/img/star.png" key={i}/>
                    )}
                  
                  <span>{review?.star}</span>
                </div>
                <span>1 week ago</span>
                <p>
                  {review?.desc}
                </p>
                <div className="details">
                  <span>Helpful?</span>
                  <img  src="/img/like.png"/>
                  <span>Like</span>
                  <img  src="/img/dislike.png"/>
                  <span>Dislike</span>
                </div>
              
              <hr />
            </div>
  )
}

export default Review