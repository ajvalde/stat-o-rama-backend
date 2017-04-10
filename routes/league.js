const express = require('express');
const router = express.Router();
const request = require('request');
const knex = require('../db/knex.js');
const lolkey = process.env.LoL_key
const summoner_name = ""
let summoner_id = ""
var summoner_stats = {}




const name = 'systar'.toLowerCase().replace(/ /g, '');

router.get('/', function(req,res){
    res.send('working')
})


router.post('/', function (req, res){
    let summonerName = req.body.summoner_name.toLowerCase().replace(/ /g, '');
    getid(summonerName)
    res.json(summonerName)
})

router.get('/playersummary', function (req,res){
    res.json(summoner_stats)
})


function getid(sum_name){
     request('https://na.api.riotgames.com/api/lol/NA/v1.4/summoner/by-name/'+ sum_name + '?api_key=' + lolkey, function(err,body){
       let summoner_obj = JSON.parse(body.body)
       let summoner_id = summoner_obj[sum_name].id
       getStats(summoner_id,sum_name)
       
    })
}

function getStats(id,name){
    request('https://na.api.riotgames.com/api/lol/NA/v1.3/stats/by-summoner/' + id + '/summary?season=SEASON2017&api_key=' + lolkey, function(err,body){
        let summoner_obj = JSON.parse(body.body)
        let  sum_stats = summoner_obj.playerStatSummaries
        summoner_stats["name"] = name
        for(let i =0; i < sum_stats.length; i++){
            if(sum_stats[i].playerStatSummaryType === "Unranked"){
                 summoner_stats["unranked"] = sum_stats[i]
            }
            else if (sum_stats[i].playerStatSummaryType === "RankedFlexSR") {
                summoner_stats["rankedFlex"] = sum_stats[i]
            }
            else if (sum_stats[i].playerStatSummaryType === "RankedSolo5x5") {
                summoner_stats["rankedSolo"] = sum_stats[i]
            }
            else if (sum_stats[i].playerStatSummaryType === "AramUnranked5x5") {
                summoner_stats["aram"] = sum_stats[i]
            }
        }
       
    })
}


console.log(summoner_stats)

module.exports = router;