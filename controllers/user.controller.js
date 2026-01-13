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

    let profilePicurl = "";

    if (req.file) {
      let uplaodResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "user/profile",
      });

      profilePicurl=uplaodResult.secure_url;
    }



    const user=new UserModel({
        name:name,
        email:email,
        profilePic:profilePicurl
    })
    await user.save();
     
      fs.unlinkSync(req.file.path);

    return res.status(201).json({
        message:'User created seccessfully',
        user
    })
  } catch (err) {
    console.log(err);
    
    return res.json({ message: "Internal server error" });
  }
};

//uplaod photos
const uploaderPhotos=async(req, res)=>{
  try{
   const {userId}=req.body;

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
