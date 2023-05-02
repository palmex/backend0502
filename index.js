const express = require('express')

const app = express()
app.use(express.json())
const port = 3000

app.get('/', (req,res) => {
    res.status(200).json({"success": "your first API endpoint"})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})