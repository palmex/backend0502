const express = require('express')
const db = require('../db')

// this router will pertain to data manipulation of our CARS table

var carsRouter = express.Router()
carsRouter.use(express.json())

carsRouter.get('/test', (req,res)=>{
    console.log("cars router test")
    res.status(200).json({"cars":"test"})
})


module.exports = carsRouter; 

