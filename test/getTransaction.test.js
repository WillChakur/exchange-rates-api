const {getTransactions, insertUser, deleteUser} = require('../src/functions');

test("Should return the user transactions if the user exist", async()=>{
    const user_ID = 1;
    let query_1 = 'SELECT * FROM users WHERE user_id = ?';
    let query_2 = 'INSERT INTO users(user_id) VALUES (?)';
    try{
        await insertUser(query_1, query_2, user_ID);
        const result = await getTransactions(user_ID);
        expect(result.success).toBe(true);
        expect(result.message).toBe(`User ${user_ID} transactions`);
    }catch(error){
        expect(error.success).toBe(false);
    }
})

test("Should alert the user if the user_id does not exist", async()=>{
    const user_ID = 100; // User that does not exist
    try{
        const result = await getTransactions(user_ID);
        expect(result.success).toBe(true);
        expect(result.message).toBe(`User ${user_ID} transactions`);
    }catch(error){
        expect(error.success).toBe(false);
        expect(error.message).toBe('The user does not exist, try another ID');
    }
})

