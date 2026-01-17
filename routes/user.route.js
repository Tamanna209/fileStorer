const express=require("express");
const { CreateUser, uploaderPhotos } = require("../controllers/user.controller");
const UserRoutes=express.Router();
const upload=require("../middlewares/multerSingleStorage.middleware");

UserRoutes.post('/user', upload.single("profilePic")  , CreateUser);

UserRoutes.post("/gallery/:id", upload.array("photos"), uploaderPhotos);

module.exports=UserRoutes;