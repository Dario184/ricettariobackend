const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const got = require('got');
const recipes = require('../model/recipes');

router.get('/', async(req,res) => {
    res.send("Sei nella API di gestione!!");
});
router.post('/', async(req,res) =>{
    if(await recipes.exists({titolo: req.body.titolo})){
        res.json(recipes.findOne({titolo: req.body.titolo}));
    }else{
        got('https://poetic-orb-283600.ew.r.appspot.com/scrap/'+req.body.link).then(() => {
            res.json(recipes.findOne({ titolo: req.body.titolo }));
        });
    }
});
module.exports = router;