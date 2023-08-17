import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom'
import './featured.scss'
const Featured = () => {
    const [input,setInput] = useState()
    const naviagate = useNavigate()

    const handleSubmit = ()=>{
        naviagate(`/gigs?search=${input}`)
    }
  return (
    <div className='featured'>
        <div className="container">
            <div className="left">
                <h1>Find the <i>freelance</i> service, right away. </h1>
                <div className="search">
                    <input type="text" placeholder='Search for any services.' onChange={e=>setInput(e.target.value)}/>
                    <button onClick={handleSubmit}>
                        <SearchIcon/>
                    </button>
                </div>
                <div className="services">
                    <span className="title">Poplular: </span>
                    <button>Website Design</button>
                    <button>WordPress</button>
                    <button>Logo Design</button>
                    <button>AI Services</button>
                </div>
            </div>
            <div className="right">
                <img src="./img/man.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Featured