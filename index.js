const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

// Our listener endpoints
app.get('/', (req,res) => {
    console.log("root endpoint")
    res.status(200).json({"success": "your first API endpoint"})
})

app.get('/test', (req,res) => {
    console.log("Im alive and well")
    res.status(200).json({"test": "endpoint"})
})
// -----------------

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})