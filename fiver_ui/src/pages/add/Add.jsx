import React,{ useReducer, useState } from 'react'
import { gigReducer ,INITIAL_STATE} from '../../reducers/GigReducer'
import newRequest from '../../utils/newRequest'
import upload from '../../utils/upload'
import './add.scss'
const Add = () => {
  const [state,dispatch] = useReducer(gigReducer,INITIAL_STATE)
  const [singleFile,setSingleFile] = useState(undefined)
  const [files,setFiles] = useState([])
  const [uploading,setUploading] = useState(false)

  const handleChange = (e) => {
    dispatch({
      type:"CHANGE_INPUT",
      payload:{name:e.target.name,value:e.target.value}
    })
  }
  const handleFeature = (e) => {
    e.preventDefault()
    dispatch({
      type:"ADD_FEATURE",
      payload:e.target[0].value
    })
    e.target[0].value = ""
  }
  const handleUpload = async () => {
    setUploading(true)
    try {
      const cover = await upload(singleFile)
      const images = await Promise.all(

      )
      
    } catch (error) {
      console.log(error);
    }
  }
  console.log(files);
  return (
    <div className='add'>
      <div className="container">
        <h2>Add New Gig</h2>
        <div className="sections">
          <div className="left">
            <label>Title</label>
            <input type="text" name='title' placeholder='eg. I will do something. I am really good at' onChange={handleChange} />
            <label>Category</label>
            <select name='cat' id='cats' onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <label htmlFor="">Cover Image</label>
            <input type="file" onChange={e=>setSingleFile(e.target.files[0])}/>
            <label htmlFor="">Upload Images</label>
            <input type="file" multiple onChange={e=>setSingleFile(e.target.files)}/>
            <label htmlFor="">Description</label>
            <textarea name="desc" id="" cols="20" rows="15" placeholder='brief description of your services' onChange={handleChange}></textarea>
            <button>Create</button>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input type="text" name="shortTitle" id="" placeholder='one-page web design' onChange={handleChange}/>
            <label htmlFor="">Short Description</label>
            <textarea name="shortDesc" id="" cols="10" rows="10" placeholder='short description of your services' onChange={handleChange}></textarea>
            <label htmlFor="">Delivery Time (eg. 3 days)</label>
            <input type="number" name='deliveryTime' min={1} onChange={handleChange}/>
            <label htmlFor="">Revision Number</label>
            <input type="number" name='revisionNumber' min={1} onChange={handleChange}/>
            <label htmlFor="">Add features</label>
            <form action="" onSubmit={handleFeature}>
              <input type="text" placeholder='eg.page design' name='features' onChange={handleChange} />
              <button type='submit'>add</button>
            </form>
        
            <label htmlFor="">Price</label>
            <input type="number" name='price' min={1}  onChange={handleChange}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add
