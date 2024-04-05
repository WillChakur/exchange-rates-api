const db = require('./database.js');

function getTransactions(res ,user_ID) {
    let sqlCheckUserExists = "SELECT * FROM users WHERE user_id = ?";
    db.all(sqlCheckUserExists, user_ID, (err, row)=> {
        if (err) {
            res.json({
                 errno:err.errno,
                 error_code:err.code,
            });
            return;
        };
        if(row.length == 0) {
            res.json({ message:'The user does not exist, try another ID'});
            return;
        }else{   
            let sqlGetTransactions = 'SELECT * FROM transactions WHERE user_id = ?';
            db.all(sqlGetTransactions, user_ID, (err, rows)=>{
                if (err) {
                    res.json({
                         errno:err.errno,
                         error_code:err.code,
                    });
                    return;
                };
                res.json({
                    message:`User ${user_ID} transactions`,
                    data: rows
                });
            });
        };
    });
};


function insertUser(res, user_ID) {
    let sqlCheckUserExists = 'SELECT * FROM users WHERE user_id = ?';

    db.all(sqlCheckUserExists, user_ID, (err, row)=>{
        if(err){
            res.status(400).json({error:err.message});
            return;
        };
        if(row.length == 0){
            let sqlInsertUser = 'INSERT INTO users(user_id) VALUES (?)';
            db.run(sqlInsertUser, user_ID, (err)=>{
                if(err){
                    res.status(400).json({ error:err.message});
                    return;
                };
            });
        };
    });
};

function insertTransaction(response, user_ID) {
    let sqlInsertTransaction = `INSERT INTO transactions(base_currency, base_value, brl, usd, eur, jpy, date_time, user_id)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                                
    let datetime = new Date(response.data.timestamp * 1000);    
    let datetimeStr = datetime.toString();
    let params = [response.data.base, 1, response.data.rates.BRL, response.data.rates.USD, response.data.rates.EUR, response.data.rates.JPY, datetimeStr, user_ID];                              

    db.run(sqlInsertTransaction, params, (err)=>{
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
    });
};

module.exports = {
    insertTransaction,
    insertUser,
    getTransactions
};

