const db = require("./database.js");

function getTransactions(user_ID) {
    let sqlCheckUserExists = "SELECT * FROM users WHERE user_id = ?";
    
    return new Promise((resolve, reject)=> {
        db.all(sqlCheckUserExists, user_ID, (err, row)=> {
            if (err) {
                reject({
                    success: false,
                    errno:err.errno,
                    error_code:err.code,
                })
                return;
            };
            if(row.length == 0) {
                reject({
                    success: false,
                    message: "The user does not exist, try another ID"
                });
                return;
            }else{   
                let sqlGetTransactions = "SELECT * FROM transactions WHERE user_id = ?";
                db.all(sqlGetTransactions, user_ID, (err, rows)=>{
                    if (err) {
                        reject({
                            success: false,
                            errno:err.errno,
                            error_code:err.code
                        });
                        return;
                    }else{
                        resolve({
                            success: true,
                            message:`User ${user_ID} transactions`,
                            data: rows
                        });
                    };
                });
            };
        });
    });
};

//Insert user V2
function insertUser(query_1, query_2, user_ID){
    return new Promise((resolve, reject) => {
        db.all(query_1, user_ID, (err, rows)=>{
            if(err){
                reject({
                    success: false,
                    error: err.message
                });
                return;
            };
            if(rows.length == 0){
                db.run(query_2, user_ID, (err)=>{
                    if(err){
                        reject({
                            success: false,
                            error: err.message
                        });
                    }else{
                        resolve({
                            success: true,
                            message: `User with id ${user_ID} has been added`
                        });
                    };
                });
            }else{
                resolve({
                    success: true,
                    message: `User with id ${user_ID} exist`
                });
            };
        });
    });
};

function insertTransaction(response, user_ID) {
    return new Promise((resolve, reject)=>{
        let query_1 = "SELECT * FROM users WHERE user_id = ?";
        let query_2 = "INSERT INTO users(user_id) VALUES (?)";
        insertUser(query_1, query_2, user_ID);
        
        let sqlInsertTransaction = `INSERT INTO transactions(base_currency, base_value, brl, usd, eur, jpy, date_time, user_id)
                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;                            
        let datetime = new Date(response.data.timestamp * 1000);    
        let datetimeStr = datetime.toString();
        let params = [response.data.base, 1, response.data.rates.BRL, response.data.rates.USD, response.data.rates.EUR, response.data.rates.JPY, datetimeStr, user_ID];                              

        db.run(sqlInsertTransaction, params, (err)=>{
            if(err){
                reject({
                    success: false,
                    error: err.message
                });
            }else{
                resolve({
                    success: true,
                    message: "Transaction inserted with success"
                });
            };
        });
    });
};

function deleteUser(user_ID){
    let query = "DELETE FROM users WHERE user_id = ?";
    return new Promise((resolve, reject) => {
        db.run(query, user_ID, function(err){
            if(err){
                reject({
                    success: false,
                    error: err.message
                });
                return;
            }
            if(this.changes === 0){
                reject({
                    success: false,
                    message: "The user does not exist"
                });
            }else{
                resolve({
                    success: true,
                    message: "User deleted."
                });
            };
        });
    });
};

function deleteLastTransaction(user_ID){
    let query = `DELETE FROM transactions
                 WHERE transaction_id = (
                    SELECT transaction_id
                    FROM transactions
                    WHERE user_id = ?
                    ORDER BY transaction_id DESC
                    LIMIT 1
                 )`;
    
    return new Promise((resolve, reject)=>{
        db.run(query, user_ID, (err)=>{
            if(err){
                reject({
                    success: false,
                    error: err.message
                });
            }else{
                resolve({
                    success: true,
                    message: "Transaction deleted."
                });
            };
        });
    });
};

module.exports = {
    insertTransaction,
    insertUser,
    getTransactions,
    deleteUser,
    deleteLastTransaction
};