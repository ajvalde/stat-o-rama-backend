const express = require('express');
const app = express();
// const knex = ()
const request = require('request');


app.get('/', function(req,res){
    res.send('working');
});


app.listen(3000);
console.log('API is running on port 3000')