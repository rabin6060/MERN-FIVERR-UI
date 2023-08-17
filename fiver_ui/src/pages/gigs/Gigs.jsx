import { useQuery} from '@tanstack/react-query'
import React,{ useState,useRef,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import GigCard from '../../components/gigCard/GigCard'

import newRequest from '../../utils/newRequest'
import './gigs.scss'
const Gigs = () => {
  const [isDown,setIsDown] = useState(false)
  const [sort,setSort] = useState("sales")
  const minRef = useRef()
  const maxRef = useRef()
  const {search} = useLocation()
  const reSort = (type) => {
    setSort(type)
    setIsDown(false)
  }
  
  const {isloading,error,data,refetch} = useQuery({
    queryKey:["gigs"],
    queryFn:()=>
    newRequest
    .get( `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`)
    .then((res)=>{
      return res.data
    })
  })

  useEffect(()=>{
    refetch()
  },[sort])

  const apply = ()=>{
    refetch()
  }

  return (
    <div className='gigs'>
      <div className="container">
        <span className='breadcrumbs'>FIVERR-GRAPGICS & DESIGN</span>
        <h2>AI Artist</h2>
        <p>Stand out from the crowd with a logo that fits your brand personality</p>
        <div className="menu">
          <div className="left">
            <span>Budged</span>
            <input ref={minRef} type="number" placeholder='min' />
            <input ref={maxRef} type="number" placeholder='max' />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className='sortBy'>Sort By:</span>
            <span className='sortType'>{sort === "sales"?"Best Selling":"Newest"}</span>
            <img onClick={()=>setIsDown(!isDown)} src="./img/down.png" />
            
            { isDown && <div className='rightMenu'>
              { sort === "sales"?(<span onClick={()=>reSort("createdAt")}>Newest</span>):
              (<span onClick={()=>reSort("sales")}>Best Selling</span>)}
            </div>}
          </div>
        </div>
        <div className="cards">
        { isloading
          ? "loading"
          : error
          ? "something went wrong"
          : data?.map(item=>(
            <GigCard key={item._id} item={item}/>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Gigs