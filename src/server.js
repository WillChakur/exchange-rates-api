const express = require('express');
const axios = require('axios');
const api_key = require('./api_key.js');
const logger = require('./logger.js');

const url_currencies = `http://api.exchangeratesapi.io/v1/latest?access_key=${api_key}&base=EUR&symbols=BRL,USD,EUR,JPY`;
const app = express();
const PORT = 8000;

const {insertUser, insertTransaction, getTransactions, deleteLastTransaction, deleteUser} = require('../src/functions.js');

// Latest currencies with base EUR
app.get('/get_currency/:id', (req, res)=>{
    axios.get(url_currencies)
    .then((response)=>{
        res.json({
            data:response.data
        });
        insertTransaction(response, req.params.id);
    }).catch((error)=>{
        res.json({
            status:error.response.status,
            data:error.response.data
        });
    });
});

//Getting user transaction
app.get('/user_transaction/:id', async(req, res)=>{
    try{
        const result = await getTransactions(req.params.id);
        logger.info('Testing Winston');
        res.json(result)
    }catch(error){
        res.json(error)
    };
});

//Testing insert user
app.get('/insert_user/:id', async (req, res)=>{
    let query_1 = 'SELECT * FROM users WHERE user_id = ?';
    let query_2 = 'INSERT INTO users(user_id) VALUES (?)';
    
    try{
        let result = await insertUser(query_1, query_2, req.params.id);
        res.json(result);
    }catch(error){
        res.status(400).json(error);
    }
});

//Testing delete function
app.get('/delete_transaction/:id', async (req, res)=>{
    try{
        const result = await deleteLastTransaction(req.params.id);
        res.json(result);
    }catch(error){
        res.json(error)
    }
})

//Testing delete user
app.get('/delete_user/:id', async (req, res)=>{
    try{
        const result = await deleteUser(req.params.id);
        res.json(result);
    }catch(error){
        res.json(error)
    }
})

app.listen(PORT, (err)=>{
    if (err) console.log("Error in server setup");
    console.log(`Server listening on Port ${PORT}`);
});

