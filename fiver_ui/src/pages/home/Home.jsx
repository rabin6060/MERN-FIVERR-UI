import React from 'react'
import Card from '../../components/cards/Card'
import Featured from '../../components/featured/Featured'
import Slide from '../../components/slide/Slide'
import {cards, projects} from "../../data"
import ProSlide from "../../components/proSlide/ProSlide"
import ProCard from "../../components/projectCard/ProCard"
import "./home.scss"

const Home = () => {
  return (
    <div className='home'>
      <Featured/>
      <div className="trustedBy">
        <span>Trusted By: </span>
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png" alt="facebook"/>
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png" alt="NETFLIX"></img>
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png" alt="NETFLIX"></img>
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png" alt="P&amp;G"></img>
        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png" alt="PayPal"></img>
      </div>
      <Slide slidesToShow={5} arrowsScroll={5}>
        {
           cards.map(card=>(
            <Card key={card.id} card={card}/>
          ))
        }
      </Slide>
      <div className="features">
        <div className="container">
          <div className="left">
            <h2>The best part? Everything.</h2>
            <div className="texts">
              <div className="text-up">
                <img src="./img/check.png" alt="check" />
                <span>Stick to your budget</span>
              </div>
              <p>Find the right service for every price point. No hourly rates, just project-based pricing.</p>
            </div>
            <div className="texts">
              <div className="text-up">
                <img src="./img/check.png" alt="check" />
                <span>Stick to your budget</span>
              </div>
              <p>Find the right service for every price point. No hourly rates, just project-based pricing.</p>
            </div>
            <div className="texts">
              <div className="text-up">
                <img src="./img/check.png" alt="check" />
                <span>Stick to your budget</span>
              </div>
              <p>Find the right service for every price point. No hourly rates, just project-based pricing.</p>
            </div>
            <div className="texts">
              <div className="text-up">
                <img src="./img/check.png" alt="check" />
                <span>Stick to your budget</span>
              </div>
              <p>Find the right service for every price point. No hourly rates, just project-based pricing.</p>
            </div>
          </div>
          <div className="right">
            <video src="" controls></video>
          </div>
        </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="left">
            <div className="top">
              <span>fiverr</span>
              <span className='dot'>.</span>
              <span>Business Solutions</span>
            </div>
            <h1>Advanced solutions and professional talent for businesse</h1>
            <div className="details">
              <div className="detail">
                <img src="./img/check.png" alt="" />
                <div className="text">
                  <span>Fiverr Pro</span>
                  <p>Access top freelancers and professional business tools for any project</p>
                </div>
              </div>
              <div className="detail">
                  <img src="./img/check.png" alt="" />                <div className="text">
                  <span>Fiverr Pro</span>
                  <p>Access top freelancers and professional business tools for any project</p>
                </div>
              </div>
              <div className="detail">
                  <img src="./img/check.png" alt="" />                <div className="text">
                  <span>Fiverr Pro</span>
                  <p>Access top freelancers and professional business tools for any project</p>
                </div>
              </div>
              
            </div>
            <button>Learn More</button>
          </div>
          <div className="right">
           <img alt="Fiverr Pro freelancers" src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/51c35c7cecf75e6a5a0110d27909a2f5-1690202609364/EN.png" loading="lazy"/>
          </div>
        </div>
      </div>
      <ProSlide slidesToShow={4} arrowsScroll={4}>
        {
           projects.map(card=>(
            <ProCard key={card.id} card={card}/>
          ))
        }
      </ProSlide>
    </div>
    
  )
}

export default Home