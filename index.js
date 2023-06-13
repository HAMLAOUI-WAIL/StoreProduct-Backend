import express from "express";
// const express = require('express')
import productsRouter from "./routes/products.js"

// if Route does not exist
import { notFound } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

import { connectDB } from "./db/connect.js"; 

import dotenv from "dotenv"
dotenv.config()


const app = express() 

app.use(express.json())

app.get("/",(req,res)=>{
  res.send('<h1>Store API</h1><a href="/api/products">Products Routes</a>')
})

app.use("/api/products",productsRouter)

// products route
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const start = async ()=>{
  try {
    // connect to the DB
    await connectDB(process.env.MONGO_db_lOCAL)
    app.listen(port,console.log(`server listening on port ${port}...`))

  }catch(err){
    console.log(err)
  }
}

start()