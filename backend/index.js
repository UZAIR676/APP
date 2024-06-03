import express from "express"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'

import  path from 'path'



import connectDB from "./confiq/db.js"



dotenv.config();

connectDB();
const app = express();



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const PORT = process.env.PORT || 3000


app.listen(PORT, ()=>{
   console.log(`server is running at port ${PORT}`);
})
