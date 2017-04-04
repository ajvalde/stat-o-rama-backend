const express = require('express');
const router = express.Router();
const request = require('request');
const knex = require('../db/knex.js');

function get_users(){
    return knex.select().from('users')
}

router.get('/', function(req,res){
    get_users().then(function(data){
        res.send(data)
    })
})

router.get('/:id', function(req,res){
    knex.select().from('users').where('id', req.params.id).then(function(data){
       res.send(data) 
    })
    // res.send(req.params.id)
})

router.delete('/:id', function(req,res){
    knex.select().from('users').where('id', req.params.id).del().then(function(data){
    
    })
     res.send('deleted')
})


module.exports = router;