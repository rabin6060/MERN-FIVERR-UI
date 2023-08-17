import React from 'react'
import Slider from 'infinite-react-carousel';
import './proslide.scss'


const Slide = ({children,slidesToShow,arrowsScroll}) => {
  return (
    <div className='proslide'>
        <div className="container">
            <h2>Inspiring work made on Fiverr</h2>
            <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll} >
            {children}
            </Slider>
        </div>
    </div>
  )
}

export default Slide