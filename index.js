const express = require('express')



const app = express()

app.use(express.json())

const port = 3000

// Our listener endpoints

app.get('/name', ()=> {})
app.post('/name', ()=> {})

app.post('/', (request,response) => {
    console.log(request.body)
    response.status(200).json(request.body)
})

app.get('/test', (req,res) => {
    console.log("Im alive and well")
    res.status(200).json({"test": "endpoint"})
})
// -----------------

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})