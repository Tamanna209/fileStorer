const express=require("express");
const { CreateUser } = require("../controllers/user.controller");
const UserRoutes=express.Router();
const upload=require("../middlewares/multerSingleStorage.middleware");

UserRoutes.post('/user', upload.single("profilePic")  , CreateUser);

module.exports=UserRoutes;