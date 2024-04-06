const api_key = require('../src/api_key');
const axios = require('axios');
const url_currencies = `http://api.exchangeratesapi.io/v1/latest?access_key=${api_key}&base=EUR&symbols=BRL,USD,EUR,JPY`;


// test("GET /get_currency/:id", async ()=>{
//     const response = await axios.get(url_currencies);
//     expect(response.data.success).toBe(true);
// });






