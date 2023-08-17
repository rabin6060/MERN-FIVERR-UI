import React from 'react'
import './procard.scss'
const Card = ({card}) => {
  return (
      <div className="proCard">
        
          <img src={card.img} alt="" />
          <div className="info">
            <img src={card.pp} alt="" />
            <div className="detail">
              <span>{card.cat}</span>
              <span>By {card.username}</span>
            </div>
          </div>
       
      </div>

  )
}

export default Card