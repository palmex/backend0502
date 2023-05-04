const express = require('express')
const db = require('../db')

// this router will pertain to data manipulation of our CARS table

var usersRouter = express.Router()
usersRouter.use(express.json())

usersRouter.get('/test', (req,res)=>{
    console.log("users router test")
    res.status(200).json({"users":"test"})
})

usersRouter.get('/all',(req,res)=> {
    console.log(req.headers)
    if(req.headers.admin){
        const queryStatement = "SELECT * FROM users;"
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
usersRouter.get('/:userId',(req,res)=> {
    console.log(req.params.userId)
    const queryStatement = `SELECT * FROM users WHERE user_id=$1;`
    dbQuery(queryStatement, [req.params.userId], req,res)
    console.log(res)
})


usersRouter.post('/new',(req,res)=> {
    console.log(req.body)
    let name = req.body.name
    let email = req.body.email
    let phone = req.body.phone
    const queryStatement = `INSERT INTO users (name,email,phone
        ) VALUES ($1,$2,$3) RETURNING *;`
        dbQuery(queryStatement, [name,email,phone], req,res)
})

usersRouter.put('/update/:userId',(req,res)=> {
    console.log(req.body)
    let name = req.body.name
    let email = req.body.email
    let phone = req.body.phone
    const queryStatement = `UPDATE users SET
    name=$1,email=$2,phone=$3 WHERE user_id=$4 RETURNING *;`
    dbQuery(queryStatement, [name,email,phone,req.params.userId], req,res)
    
})

usersRouter.delete('/delete/:userId',(req,res)=> {
    console.log(req.params.userId)
    const queryStatement = `DELETE FROM users WHERE user_id =$1;`
        dbQuery(queryStatement, [req.params.userId], req,res)
})

const dbQuery = (queryStatement, params, request, response) => {
    db.query(queryStatement,params, (error, results) => {
        if(error){
            response.status(500).json({'error':error.message})
            console.log(error.message)
        } else {
            result = results.rows 
            response.status(200).json(result)
        }
    })
}


module.exports = usersRouter; 

