const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const api_key = require('./api_key.js');
const db = require('./database.js');

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.unsubscribe(bodyParser.json());

// Latest currencies with base EUR
app.get('/get_currency/:id', (req, res)=>{
    //const url_currencies = `http://api.exchangeratesapi.io/v1/latest?access_key=${api_key}&base=EUR&symbols=BRL,USD,EUR,JPY`;
    const url_currencies = `http://api.exchangeratesapi.io/v1/latest?access_key=${api_key}&base=EUR&symbols=BRL,USD,EUR,JPY`;
    axios.get(url_currencies)
    .then(response => {
        res.json({data: response.data});
        console.log('antes passei aqui');
        let sqlCheckUserExists = 'SELECT * FROM users WHERE user_id = ?'

        db.all(sqlCheckUserExists, req.params.id, (err, row)=>{
            if(err){
                res.status(500).json({ error:err.message});
                return;
            }

            if(row.length == 0){
                let sqlInsertUser = 'INSERT INTO users(user_id) VALUES (?)';
                db.run(sqlInsertUser, req.params.id, (err)=>{
                    if(err){
                        res.status(500).json({ error:err.message});
                        return;
                    }
                })
            }

            let sqlInsertTransaction = `INSERT INTO transactions(base_currency, base_value, brl, usd, eur, jpy, date_time, user_id)
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

            let datetime = new Date(response.data.timestamp * 1000);    
            let datetimeStr = datetime.toString();
            let params = [response.data.base, 1, response.data.rates.BRL, response.data.rates.USD, response.data.rates.EUR, response.data.rates.JPY, datetimeStr, req.params.id];  

            db.run(sqlInsertTransaction, params, (err)=>{
                if(err){
                    res.status(500).json({error:err.message});
                    return;
                }
            });
        });
    })
    .catch((error) => {
        res.json({
            status:error.response.status,
            data:error.response.data,
        })
    });
});

//Getting user transaction
app.get('/user_transaction/:id', (req, res)=>{
    
    let sqlCheckUserExists = 'SELECT * FROM users WHERE user_id = ?'
    db.all(sqlCheckUserExists, req.params.id, (err, row)=> {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }
        if(row.length == 0) {
            res.json({ message:'The user does not exist, try another ID'});
            return;
        }else{   
            let sqlGetTransactions = 'SELEC * FROM transactions WHERE user_id = ?';
            db.all(sqlGetTransactions, req.params.id, (err, rows)=>{
                if (err) {
                    res.json({
                         errno:err.errno,
                         error_code:err.code,
                    });
                    return;
                };
                res.json({
                    message:`User ${req.params.id} transactions`,
                    data: rows
                });
            });
        }
    });
});

app.listen(PORT, (err)=>{
    if (err) console.log("Error in server setup");
    console.log(`Server listening on Port ${PORT}`);
});
