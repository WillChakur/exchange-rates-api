const {insertTransaction, deleteLastTransaction} = require('../src/functions.js');


test("Should insert a transaction", async()=>{
    const response = {
        "data": {
            "success": true,
            "timestamp": 1712058304,
            "base": "EUR",
            "date": "2024-04-02",
            "rates": {
                "BRL": 5.43208,
                "USD": 1.074553,
                "EUR": 1,
                "JPY": 162.95606
            }
        }
    };
    try{
        const result = await insertTransaction(response, 1);
        expect(result.success).toBe(true);
        expect(result.message).toBe("Transaction inserted with success");
        await deleteLastTransaction(1);
    }catch(error){
        expect(error.success).toBe(false);
    };
}); 