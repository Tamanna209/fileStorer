import React from 'react'
import { useState } from 'react'

const Gallery = () => {
    const [photos , setPhotos]=useState([]);
    const [loading, setLoading]=useState(false);
  return (
    <div>
       <h3>Uplaod your memories here :</h3>
       <div>
        <form action="">
            <input type="file" accept='/image/*' multiple name="" id="" />
             <button disabled={loading}>{loading? "Submitting..":"Submit"}</button>
        </form>
       </div>
    </div>
  )
}

export default Gallery
