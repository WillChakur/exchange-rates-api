const express = require('express');
const axios = require('axios');
const api_key = require('./api_key.js');
const db = require('./database.js');


const url_currencies = `http://api.exchangeratesapi.io/v1/latest?access_key=${api_key}&base=EUR&symbols=BRL,USD,EUR,JPY`;
const app = express();
const PORT = 8000;

const {insertUser, insertTransaction, getTransactions} = require('../src/functions.js');

// Latest currencies with base EUR
app.get('/get_currency/:id', (req, res)=>{
    axios.get(url_currencies)
    .then((response)=>{
        res.json({
            data:response.data
        });
        insertUser(res, req.params.id);
        insertTransaction(response, req.params.id);
    }).catch((error)=>{
        res.json({
            status:error.response.status,
            data:error.response.data
        });
    });
});

//Getting user transaction
app.get('/user_transaction/:id', (req, res)=>{
    getTransactions(res, req.params.id);
})

app.listen(PORT, (err)=>{
    if (err) console.log("Error in server setup");
    console.log(`Server listening on Port ${PORT}`);
});

