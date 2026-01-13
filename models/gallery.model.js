const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  images: [{ type: String }],
}, {timestamps:true});


const GalleryModel=mongoose.model("Gallery", GallerySchema);

module.exports=GalleryModel;