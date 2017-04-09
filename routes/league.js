const express = require('express');
const router = express.Router();
const request = require('request');
const knex = require('../db/knex.js');
const lolkey = process.env.LoL_key
const summoner_name = ""
let summoner_id = ""
let summoner_stats = {}



const name = 'systar'.toLowerCase().replace(/ /g, '');

router.get('/', function(req,res){
    res.send('working')
})


router.get('/summonerid', function (req, res){
    request('https://na.api.riotgames.com/api/lol/NA/v1.4/summoner/by-name/'+ summoner_name + '?api_key=' + lolkey, function(err,body){
       let summoner_id = JSON.parse(body.body)
        res.send(summoner_id)
    })
})

router.post('/', function (req, res){
    getid(req.body.summoner_name)
    res.json(req.body)
})

function getid(sum_name){
     request('https://na.api.riotgames.com/api/lol/NA/v1.4/summoner/by-name/'+ sum_name + '?api_key=' + lolkey, function(err,body){
       let summoner_obj = JSON.parse(body.body)
       let summoner_id = summoner_obj[sum_name].id
       unrankedStats(summoner_id)
    })
}

function unrankedStats(id){
    request('https://na.api.riotgames.com/api/lol/NA/v1.3/stats/by-summoner/' + id + '/summary?season=SEASON2017&api_key=' + lolkey, function(err,body){
        let summoner_obj = JSON.parse(body.body)
         summoner_stats = summoner_obj.playerStatSummaries[6]
        console.log(summoner_stats)
    })
}


module.exports = router;