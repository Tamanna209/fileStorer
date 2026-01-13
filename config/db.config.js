const mongoose=require("mongoose");

const dbConfig=async()=>{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to db ');
    
}

module.exports=dbConfig;