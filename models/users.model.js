const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:[true, 'Email Already existed'],
        required:true
    },
    profilePic:{
        type:String,
    }
}, {timestamps:true})

const UserModel=mongoose.model("Users", UserSchema);

module.exports=UserModel;