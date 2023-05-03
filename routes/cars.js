const express = require('express')
const db = require('../db')

// this router will pertain to data manipulation of our CARS table

var carsRouter = express.Router()
carsRouter.use(express.json())

carsRouter.get('/test', (req,res)=>{
    console.log("cars router test")
    res.status(200).json({"cars":"test"})
})

carsRouter.get('/all', (req,res)=> {

    console.log(req.headers)
    if(req.headers.admin){
        const queryStatement = "SELECT * FROM cars;"
        db.query(queryStatement, (error, results)=>{
            if(error){
                res.status(500).json(error)
            } else {
                result = results.rows 
                res.status(200).json(result)
            }
        })
    } else {
        res.status(403).json({"unauthorized":"please use an admin header"})
    }
    
})


module.exports = carsRouter; 

