import React,{ useEffect, useState }  from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import newRequest from "../../utils/newRequest"
import "./navbar.scss"
//import {Link} from "react-router-dom"
const Navbar = () => {
  const [active,setActive] = useState(false)
  const [open,setOpen] = useState(false)
  const navigate = useNavigate()
  const {pathname} = useLocation()
  
  const isActive = () =>{
    window.scrollY>0? setActive(true):setActive(false)
  }
  
  useEffect(()=>{
    window.addEventListener("scroll",isActive)
    return ()=>{
      window.removeEventListener("scroll",isActive)
    }
  })
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const handleLogout = async () => {
    await newRequest.post('/auths/logout')
    localStorage.setItem('currentUser',null)
    navigate('/')
  }
  return (
    <div className={active || pathname!=="/" ?'navbar active':'navbar'}>
      <div className="container">
        
          <div className="logo">
            <Link to='/' className='link'>
             <span className='text'
             >fiverr</span>
            </Link>
            <span className='dot'>.</span>
          </div>
       
        
        <div className="links">
          <span>Fiver Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser && <Link to='/login' className='link'><span>Sign in</span></Link>}
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && <Link to='/register'><button>Join</button></Link>}
          {
            currentUser && 
            <div className="user">
              <img src={currentUser.img || "./img/noavatar.jpg"} alt="" />
              <span onClick={()=>setOpen(!open)}>{currentUser?.username}</span>
              {open && <div className="options">
                {
                  currentUser?.isSeller &&
                  <>
                    <Link to='/mygigs' className='link' onClick={()=>setOpen(false)}>Gigs</Link>
                    <Link to='/add' className='link' onClick={()=>setOpen(false)}>Add a new Gigs.</Link>
                  </>
                }
                <Link to='/orders' className='link' onClick={()=>setOpen(false)}>Orders</Link>
                <Link to='/messages' className='link' onClick={()=>setOpen(false)}>Messages</Link>
                <Link to='/' className='link' onClick={handleLogout}>Logout</Link>
              </div>}
            </div>
          }
        </div>
        
      </div>
      
       {(active || pathname!=="/") && <>
        <hr />
        <div className="menu">
          <Link to='/' className='link'>Graphic & Design</Link>
          <Link to='/' className='link'>Programming & Tech</Link>
          <Link to='/' className='link'>Digital Marketing</Link>
          <Link to='/' className='link'>Video & Animation</Link>
          <Link to='/' className='link'>Writing & Translation</Link>
          <Link to='/' className='link'>Music & Audio</Link>
          <Link to='/' className='link'>Business</Link>
          <Link to='/' className='link'>Data</Link>
          <Link to='/' className='link'>Photography</Link>
          <Link to='/' className='link'>AI Services</Link>
        </div>
        <hr />
        </>}
        
    </div>
  )
}

export default Navbar