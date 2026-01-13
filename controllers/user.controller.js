const cloudinary = require("../config/cloudinary.singlePic");
const UserModel = require("../models/users.model");
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

    return res.status(201).json({
        message:'User created seccessfully',
        user
    })
  } catch (err) {
    console.log(err);
    
    return res.json({ message: "Internal server error" });
  }
};

module.exports = { CreateUser };
