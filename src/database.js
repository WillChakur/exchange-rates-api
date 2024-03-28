const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/TRANSACTIONS.db', (err)=>{
    if(err) {
        console.log(err.message);
        throw err;
    }

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
});

module.exports = db;