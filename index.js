require("dotenv").config();
const express=require("express");
const dbConfig = require("./config/db.config");
const UserRoutes = require("./routes/user.route");
const server=express();
const cors=require("cors");

const PORT=process.env.PORT;

// middlewares
server.use(express.json());
server.use(cors({
    origin:'http://localhost:5173'
}))
//routes
server.use("/api", UserRoutes)

server.listen(PORT, async()=>{
    await dbConfig();
   console.log(`Server started at http://localhost:${PORT}`);
   
})