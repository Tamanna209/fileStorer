import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";


const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { state } = useLocation();
  const {id}=useParams();
    
 

  const handleImages = (e) => {
    const photos = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...photos]);
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();
      console.log('form submitted');
      
    if (photos.length == 0) {
      toast.error("No images selected");
      return;
    }

    try {
      // console.log("chlaaa");
      
      setLoading(true);
      const formData = new FormData();

      formData.append("userId", id);
 
      console.log("user id append hua");
      
      photos.forEach((photo) => {
        formData.append("photos", photo);
      });

      console.log("images load huyi");
      
      const res = await axios.post(
        `http://localhost:8091/api/gallery/${id}`,
        formData
      );
console.log("before toast");

      toast.success(res.data.message || 'Images uploaded successfully');
      console.log("submit hua");
      setPhotos([])
    } catch (err) {
      toast.error(err.response?.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 

  if (!id) {
    return (
      <div>
        <h3>NO USER FOUND !!</h3>
      </div>
    );
  }
  return (
    <div>
      <h3>Uplaod your memories here : {id}</h3>
      <div>
        <form action="" onSubmit={hanldeSubmit}>
          <input
            type="file"
            accept="/image/*"
            multiple
            name="photos"
            id=""
           
            onChange={handleImages}
          />

           {photos.length === 0  ? <p>No images selected</p>:  <div style={{display:"flex", gap:'20px', height:'100px', width:'200px'}}>
                {
            photos.map((photo, index)=>(  
              <img key={index}
              src={URL.createObjectURL(photo)} />              
            ))
          }
           </div>}
          
          
          <button disabled={loading} type="submit">
            {loading ? "Submitting.." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Gallery;
