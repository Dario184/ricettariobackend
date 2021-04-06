const express = require('express');
const validator = require('email-validator');
const router = express.Router();
const mongoose = require('mongoose');
const users = require('../model/users');

router.get('/', async(req, res) => {
    res.send('API di controllo');
});

router.get('/controlnick/:key', async (req, res) =>{
    if(await users.exists({nickname : req.params.key})){
        res.status('403');
        res.send('Already exist');
    }else res.send('Check');
});
router.get('/controlmail/:key',async (req, res) =>{
    if(await users.exists({mail: req.params.key})){
        res.status('403');
        res.send('Already exist');
    }else{
        if(!validator.validate(req.params.key)){
            res.status('403');
            res.send('Invalid email address');
        }else res.send('Check');
    }
});
module.exports = router;