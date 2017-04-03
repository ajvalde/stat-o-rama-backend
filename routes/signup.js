const express = require('express');
const router = express.Router();
const request = require('request');
const md5 = require('md5');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0/\/", salt);
const knex = require('../db/knex.js');



function removePound(string){
  newString = ""
  for(let i = 0; i < string.length; i++){
    if(string[i] === "#"){
      newString = newString + "-"
    }else{
      newString = newString + string[i]
    }
  }
  return newString;
}



router.get('/', function(req,res){
        res.send('working')
})



router.post('/', function (req,res){
    let new_user = req.body;
    let btag = removePound(new_user.battle_tag)
    let hashed = bcrypt.hashSync(new_user.password[0], salt);
     console.log(btag)

    knex('users').insert({name: new_user.name, email: new_user.email, password: hashed, summoner_name: new_user.summoner_name, battle_tag: btag})
    .then( function(data){

    })

    res.send("yay");
});




module.exports = router;