import React from 'react'
import Slider from 'infinite-react-carousel';
import './slide.scss'



const Slide = ({children,slidesToShow,arrowsScroll}) => {

  
  return (
    <div className='slide'>
        <div className="container">
            <h2>Popular Services</h2>
            <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll} >
            {children}
            </Slider>
        </div>
    </div>
  )
}

export default Slide