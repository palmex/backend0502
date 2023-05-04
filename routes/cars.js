const express = require('express')
const db = require('../db')

// this router will pertain to data manipulation of our CARS table

var carsRouter = express.Router()
carsRouter.use(express.json())

carsRouter.get('/test', (req,res)=>{
    console.log("cars router test")
    res.status(200).json({"cars":"test"})
})

carsRouter.get('/all',(req,res)=> {
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
carsRouter.get('/1/:carId',(req,res)=> {
    console.log(req.params.carId)
   
    const queryStatement = `SELECT * FROM cars WHERE car_id=$1;`
    dbQuery(queryStatement, [req.params.carId], req,res)
})


carsRouter.post('/new',(req,res)=> {
    console.log(req.body)
    let make = req.body.make
    let model = req.body.model
    let year = req.body.year
    let odometer = req.body.odometer
    const queryStatement = `INSERT INTO cars (make,model,year,odometer
        ) VALUES ($1,$2,$3,$4) RETURNING *;`
        dbQuery(queryStatement, [make,model,year,odometer], req,res)
})

carsRouter.put('/update/:carId',(req,res)=> {
    console.log(req.params.carId)
    let make = req.body.make
    let model = req.body.model
    let year = req.body.year
    let odometer = req.body.odometer
    const queryStatement = `UPDATE cars SET
    make=$1,model=$2,year=$3,odometer=$4 WHERE car_id=$5 RETURNING *;`
    dbQuery(queryStatement, [make,model,year,odometer,req.params.carId], req,res)
})

carsRouter.delete('/delete/:carId',(req,res)=> {
    console.log(req.params.carId)
    const queryStatement = `DELETE FROM cars WHERE car_id =$1;;`
        dbQuery(queryStatement, [req.params.carId], req,res)
})

const dbQuery = (queryStatement, params, request, response) => {
    db.query(queryStatement,params, (error, results) => {
        if(error){
            response.status(500).json(error)
        } else {
            result = results.rows 
            response.status(200).json(result)
        }
    })
}


module.exports = carsRouter; 

