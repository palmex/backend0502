const express = require('express')
const dotenv = require('dotenv')
const db = require('./db')
const carsRouter = require('./routes/cars')

dotenv.config()
const app = express()
app.use(express.json())
app.use('/cars', carsRouter)

const port = 3000

// Our listener endpoints

// API endpoint #1
app.post('/async', (req, res)=> {
    // when a request comes...
    console.log('1. Im calling the bank', req.body)
    
    // callback function
    setTimeout(()=>{
        console.log("3. bank finally calls back")
        // below callback function
        console.log('4. bank says you are compliant')
        res.status(200).json({"thank you":"for your request"})
    },3000)
})

// API endpoint #2
app.get('/db', (req,res)=> {
    const queryStatement = "SELECT * FROM cars;"
    db.query(queryStatement, (error, results)=>{
        if(error){
            res.status(500).json(error)
        } else {
            console.log(results)
            result = results.rows 
            res.status(200).json(result)
        }
    })
})

// API endpoint #3 - echo back request body
app.post('/echo', (request,response) => {
    console.log(request.body)
    response.status(200).json(request.body)
})

// API endpoint #4
app.get('/test', (req,res) => {
    console.log("Im alive and well")
    res.status(200).json({"test": "endpoint"})
})
// -----------------

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})