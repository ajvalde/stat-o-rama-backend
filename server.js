const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()
// const knex = ()
const request = require('request');
const bodyParser = require('body-parser');
require('dotenv').config();
const lolkey = process.env.LoL_key

//routes 
const league = require('./routes/league');
const signup = require('./routes/signup');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/league', league);
app.use('/signup', signup);

app.get('/', function(req,res){
    res.send('working');
});

app.get('/signup', function(req,res){

})

app.get('/api', function(req,res){
    request('https://ow-api.herokuapp.com/profile/pc/us/Synstar-1557', function (err,body){
        var stats = JSON.parse(body.body)
        // console.log(stats)
        res.json(stats) 
    });
    
})

app.listen(3000);
console.log('API is running on port 3000')
module.exports = app;