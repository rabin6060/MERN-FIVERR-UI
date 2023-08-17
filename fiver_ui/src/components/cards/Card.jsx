import React from 'react'
import {Link} from "react-router-dom"
import './card.scss'
const Card = ({card}) => {
  return (
    <Link to="/gigs?cat=design">
      <div className="catCard">
        <img src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  )
}

export default Card