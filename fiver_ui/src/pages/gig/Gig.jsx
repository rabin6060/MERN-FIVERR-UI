import React from 'react'
import Slider from "infinite-react-carousel"
import "./gig.scss"
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { Link, useParams } from 'react-router-dom'
import Reviews from '../../components/reviews/Reviews'


const Gig = () => {
  const {id} = useParams()
  const {isloading,error,data} = useQuery({
    queryKey:["gig"],
    queryFn:()=>
    newRequest
    .get( `/gigs/single/${id}`)
    .then((res)=>{
      return res.data
    })
  })
  

  const {isloading:loadingUser,error:userError,data:userData} = useQuery({
    queryKey:["user"],
    queryFn:()=>
    newRequest
    .get( `/users/${data.userId}`)
    .then((res)=>{
      return res.data
    })
  })
  
  
  return (
    <div className='gig'>
      {isloading?("loading"):
        <div className="container">
        <div className="left">
          <div className="breadcrumbs">
            FIVER/GRAPHICS & DESIGN/
          </div>
          <h1>I will design professional outstanding minimalist logo creation</h1>
          <div className="user">
            <img className='pp' src={userData?.img} />
            <span className='name'>{userData?.username}</span>
            {!isNaN(data?.totalStars / data?.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data?.totalStars / data?.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data?.totalStars / data?.starNumber)}</span>
                  </div>
                )}
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className='slider'>
          {
            data?.images.map((image)=>(
              <img src={image} key={image} />
            ))
          }
          </Slider>
          <h2>About this gig</h2>
          <p>Look no further than my Fiverr gig! Using stable diffusion techniques, I can create stunning character designs, portraits, and illustrations that capture the essence of your favorite characters and bring them to life in a new and exciting way.Whether you're a fan of the latest anime series or looking for a custom portrait of your Roblox avatar, I have the skills and expertise to deliver high-quality AI art that exceeds your expectations</p>
          {!loadingUser && !error &&
          <div className="seller">
            <h2>About the seller</h2>
            <div className="userSeller">
              <img src={userData?.img || './img/noavatar.jpg'} />
              <div className="info">
                <span>{userData?.username}</span>
                {!isNaN(data?.totalStars / data?.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data?.totalStars / data?.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data?.totalStars / data?.starNumber)}</span>
                  </div>
                )}
                <button>Contact me</button>
              </div>
            </div>
          </div>}
          <div className="box">
            <div className="items">
              <div className="item">
                <span className="title">From</span>
                <span className="desc">{userData?.country}</span>       
              </div>
              <div className="item">
                <span className="title">Member since</span>
                <span className="desc">Apr 2022</span>       
              </div>
              <div className="item">
                <span className="title">Avg. response time</span>
                <span className="desc">1 hour</span>       
              </div>
              <div className="item">
                <span className="title">Last delivery</span>
                <span className="desc">about 12 minutes</span>       
              </div>
              <div className="item">
                <span className="title">Languages</span>
                <span className="desc">English, Spanish</span>       
              </div>

            </div>
            <hr />
            <p>
              {userData?.desc}
            </p>
          </div>
          <Reviews gigId = {id}/>
        </div>
        <div className="right">
          <div className="top">
            <h2>{data?.shortTitle}</h2>
            <span className="price">$ {data?.price}</span>
          </div>
          <p>{data?.shortDesc}</p>
          <div className="time">
            <div className="leftdet">
              <img src="/img/clock.png"/>
              <span>{data?.deliveryTime} Day Delivery</span>
            </div>
            <div className="rightdet">
              <img src="/img/recycle.png"/>
              <span>{data?.revisionNumber} revisions</span>
            </div>
          </div>
          <div className="checklist">
            {
              data?.features.map((feature)=>(
                <div className="list" key={feature}>
                  <img src="/img/greencheck.png"/>
                  <span>{feature}</span>
                </div>
              ))
            }
            
            
          </div>
          <Link to={`/pay/${id}`} className='link'><button>Continue</button></Link>
          
        </div>
      </div>}
    </div>
  )
}

export default Gig