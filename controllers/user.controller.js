const fs=require("fs");
const cloudinary = require("../config/cloudinary.singlePic");
const UserModel = require("../models/users.model");
const GalleryModel = require("../models/gallery.model");
//create user
const CreateUser = async (req, res) => {
     
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        message: "All fields are mendatory",
      });
    }
 
    const existinguser=await UserModel.findOne({email:email});

    if(existinguser){
      console.log("phle se email hai dubara mt create kro");
      
      return res.status(409).json({
        message:'User already existed with same email.'
      });
    }


     let profilePicurl = "";

    if (req.file) {
      let uplaodResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "user/profile",
      });

      profilePicurl=uplaodResult.secure_url;
        fs.unlinkSync(req.file.path);
    }



    const user=new UserModel({
        name:name,
        email:email,
        profilePic:profilePicurl
    })
    await user.save();
     
    

    return res.status(201).json({
        message:'User created seccessfully',
        user
    })
  } catch (err) {
    console.log(err);
    
    return res.status(500).json({ message: "Internal server error" });
  }
};

//uplaod photos
const uploaderPhotos=async(req, res)=>{
  try{
   const {id}=req.params;

   const userMatched=await UserModel.findById({id});

   if(!userMatched){
    return res.status(409).json({
      message:'user not found'
    })
   }

   if(!req.files || req.files.length===0){
    return res.json({
      message:'No media uploaded'
    })
   }
   let imagesUrls=[];

   for(let file of req.files){
     let uploads=await cloudinary.uploader.upload(file.path , {
      folder:'user/gallery'
     });
     imagesUrls.push(uploads.secure_url);

     fs.unlinkSync(file.path)
   }

   const gallery=new GalleryModel({
    userId:userId,
    images:imagesUrls
   })
   await gallery.save();

   return res.status(201).json({
    message:'Media uploaded succesfully',
    gallery
   })

  }catch(err){
    console.log(err);
    return res.json("Internal server error")
    
  }

}


module.exports = { CreateUser  , uploaderPhotos};
