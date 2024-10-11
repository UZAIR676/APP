import express from "express"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'


import  path from 'path'



import connectDB from "./confiq/db.js"
import userRoutes from "./routes/userRoutes.js"
import SpecialProductRoutes from "./routes/specialProductRoutes.js"
import menuRoutes from "./routes/menuRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"





dotenv.config();

connectDB();
const app = express();



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const PORT = process.env.PORT || 3000


app.use("/api/v1/users",userRoutes)
app.use("/api/v1/special",SpecialProductRoutes)
app.use("/api/v1/menu",menuRoutes)
app.use("/api/v1/order",orderRoutes)




app.listen(PORT, ()=>{
   console.log(`server is running at port ${PORT}`);
})
