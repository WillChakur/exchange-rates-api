const express = require('express');
const bodyParser = require('body-parser');
//const db = require('./src/database.js')

const app = express();
const PORT = 8000;

app.get('/', (req, res)=>{
    res.json({ "message":"success"});
})


app.listen(PORT, (err)=>{
    if (err) console.log("Error in server setup");
    console.log(`Server listening on Port ${PORT}`);
})
