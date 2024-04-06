const {insertUser, deleteUser} = require('../src/functions.js');

test("Should insert a user if it does not exist", async()=>{
    const sqlCheckUserExists = 'SELECT * FROM users WHERE user_id = ?';
    const sqlInsertUser = 'INSERT INTO users(user_id) VALUES (?)'; 
    const user_ID = 124; //User that does not exist
    
    try{
        const response = await insertUser(sqlCheckUserExists, sqlInsertUser, user_ID);
        expect(response.success).toBe(true);
        expect(response.message).toBe(`User with id ${user_ID} has been added`);
        await deleteUser(user_ID);
    }catch(error){
        expect(error.success).toBe(false);
    };
});

test("Should do anything if the user already exist", async()=>{
    const sqlCheckUserExists = 'SELECT * FROM users WHERE user_id = ?';
    const sqlInsertUser = 'INSERT INTO users(user_id) VALUES (?)'; 
    const user_ID = 1; //User that does exist
    
    try{
        const response = await insertUser(sqlCheckUserExists, sqlInsertUser, user_ID);
        expect(response.success).toBe(true);
        expect(response.message).toBe(`User with id ${user_ID} exist`);
    }catch(error){
        expect(error.success).toBe(false);
    };     
});

test("Should return an error if the database operation fails", async () => {
    //Error SELEC instead of SELECT
    
    const sqlCheckUserExists = 'SELEC * FROM users WHERE user_id = ?';
    const sqlInsertUser = 'INSERT INTO users(user_id) VALUES (?)'; 
    const user_ID = 1;
    
    try{
        const response = await insertUser(sqlCheckUserExists, sqlInsertUser, user_ID);
        expect(response.success).toBe(false);
    }catch(error){
        expect(error.success).toBe(false);
    }
});