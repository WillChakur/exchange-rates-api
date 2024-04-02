const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const api_key = '6697bb15f7b71b39102e3a289cf6f151';
const db = require('./database.js');

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.unsubscribe(bodyParser.json());

// Latest currencies with base EUR
app.get('/currencies', (req, res)=>{
    const url_currencies = `http://api.exchangeratesapi.io/v1/latest?access_key=${api_key}&base=EUR&symbols=BRL,USD,EUR,JPY`;
    axios.get(url_currencies)
    .then(response => {
        res.json({data: response.data});
    })
    .catch(err => console.log(err));
})

//Getting users
app.get('/users', (req, res)=>{
    let sql = `SELECT * from users`
    let params = [];
    db.all(sql, params, (err, rows)=> {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message:"success",
            data:rows
        })
    });
});

//Gettting user transaction
app.get('/user/:id', (req, res)=>{
    let sql = `select * from transactions where user_id = ?`
    let params = [req.params.id];
    db.all(sql, params, (err, row)=> {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message:"success",
            data:row
        })
    });
});

app.listen(PORT, (err)=>{
    if (err) console.log("Error in server setup");
    console.log(`Server listening on Port ${PORT}`);
});
