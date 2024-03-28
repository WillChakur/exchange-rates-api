const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/TRANSACTIONS.db', (err)=>{
    if(err) {
        console.log(err.message);
        throw err;
    }

<<<<<<< HEAD
    db.run('PRAGMA foreign_keys = ON;', (err)=>{

        db.run(`CREATE TABLE IF NOT EXISTS users(
            user_id INTEGER PRIMARY KEY AUTOINCREMENT
        )`, (err)=>{
            if(err){
                console.error("Error creating users table:", err.message);
            } else {
                console.log("Users table created or already exists.");
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS transactions(
            transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
            base_currency TEXT,
            base_value INTEGER,
            to_currency TEXT,
            brl REAL,
            usd REAL,
            eur REAL,
            jpy REAL,
            date_time TEXT,
            user_id INTEGER,
            FOREIGN KEY(user_id) REFERENCES users(user_id)
        )`, (err)=>{
            if(err){
                console.error("Error creating transactions table:", err.message);
            } else {
                console.log("Transactions table created or already exists.");
            }
        });
    });
=======
    db.run(`CREATE TABLE IF NOT EXISTS transactions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        base_currency TEXT,
        base_value INTEGER,
        to_currency TEXT,
        brl REAL,
        usd REAL,
        eur REAL,
        jpy REAL,
        date_time TEXT
    )`, (err)=>{
        if(err){
            console.error("Error creating transactions table:", err.message);
        } else {
            console.log("Transactions table created or already exists.");
        }
    })
>>>>>>> 74cc33a2e426d5c79c2d01c3e046d8d334710611
});

module.exports = db;