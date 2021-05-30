const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const got = require('got');
const recipes = require('../model/recipes');
const verify = require("./verify");


router.get('/', async(req,res) => {
    res.send("Sei nella API di gestione!!");
});
router.post('/', verify.auth ,async(req,res) =>{
    if(await recipes.exists({titolo: req.body.titolo})){
        res.json(await recipes.findOne({ titolo: req.body.titolo }));
    }else{
        got('https://poetic-orb-283600.ew.r.appspot.com/scrap/'+req.body.link).then(async() => {
            res.json(await recipes.findOne({ titolo: req.body.titolo }));
        });
    }
});
module.exports = router;