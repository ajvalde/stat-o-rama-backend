const express = require('express');
const router = express.Router();
const request = require('request');
const knex = require('../db/knex.js');
const lolkey = process.env.LoL_key
const summoner_name = ""
let summoner_id = ""
var summoner_stats = {
    top3: []
}
var top_three = {}





router.get('/', function(req,res){
    res.send('working')
})


router.post('/', function (req, res){
    let summonerName = req.body.summoner_name.toLowerCase().replace(/ /g, '');
    getid(summonerName)
    // console.log(summonerName)
    res.json(req.body)
})

router.get('/playersummary', function (req,res){
    res.json(summoner_stats)
})

router.get('/champs', function (req, res){
    res.json(top_three)
})


function getid(sum_name){
     request('https://na.api.riotgames.com/api/lol/NA/v1.4/summoner/by-name/'+ sum_name + '?api_key=' + lolkey, function(err,body){
       let summoner_obj = JSON.parse(body.body)
       let summoner_id = summoner_obj[sum_name].id
       getStats(summoner_id,sum_name)
       topThree(summoner_id)
    //    console.log(summoner_id)
       
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

function topThree(id) {
    request('https://na.api.riotgames.com/championmastery/location/NA1/player/' + id + '/topchampions?count=3&api_key=' + lolkey, function(err, body){
        top3 = JSON.parse(body.body) 
         console.log(top3)
        getChampData(top3[0].championId)
        getChampData(top3[1].championId)
        getChampData(top3[2].championId)
        
        
        
    })
}

function getChampData(id){
    request('https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/champion/' + id + '?champData=all&api_key=' + lolkey, function(err, body){
            champ = JSON.parse(body.body)
            // console.log(champ.id,champ.name,champ.title,champ.image)
            champ_info = {}
            champ_info["id"] = champ.id
            champ_info["name"] = champ.name
            champ_info["title"] = champ.title
            champ_info["images"] = champ.image
             console.log(champ_info)
             summoner_stats["top3"].push(champ_info)
            
    })
}

module.exports = router;