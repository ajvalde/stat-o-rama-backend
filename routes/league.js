const express = require('express');
const router = express.Router();
const request = require('request');
const lolkey = process.env.LoL_key

const name = 'systar'.toLowerCase().replace(/ /g, '');

router.get('/', function(req,res){
    res.send('working')
})


router.get('/summonerid', function (req, res){
    request('https://na.api.riotgames.com/api/lol/NA/v1.4/summoner/by-name/synstar?api_key=' + lolkey, function(err,body){
       let summoner_id = JSON.parse(body.body)
        res.send(summoner_id)
    })
})

module.exports = router;