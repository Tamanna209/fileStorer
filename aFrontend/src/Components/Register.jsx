import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [pic, setPic]=useState(null);
    const [loading, setLoading]=useState(false);

    const navigate=useNavigate();
    const handleRegistration=async(e)=>{
        e.preventDefault();
        if(!name || !email){
            toast.error("Please fil all the details")
        }

        try{
           
            setLoading(true);
            const formData=new FormData();
            formData.append("name", name);
             formData.append("email" , email);
             if(pic){
                formData.append("profilePic", pic)
             }
       
           const user= await axios.post("http://localhost:8091/api/user", formData);

           setName("");
           setEmail("");
           setPic(null);
           toast.success(user.data.message);
           navigate("/gallery");
             


        }catch(err){

            toast.error(err.response?.data?.message || "Something went wrong");
        }finally{
            setLoading(false)
        }
    }
  return (
    <div>
        Personal Storer
        <div>
            <form action="" onSubmit={handleRegistration}>
                <input type="text" name="name" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <br /><br />
                <input type="email" name="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <br /><br />
                <input type="file" name="pic" id="pic" onChange={(e)=>{setPic(e.target.files[0])}}/>
                <br /><br />
                <button disabled={loading}> { loading ? "Registering..." : "Register"}</button>
            </form>
        </div>
    </div>
  )
}

export default Register
