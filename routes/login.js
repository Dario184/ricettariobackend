const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const users = require('../model/users');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    res.send('Sei API di login');
});

router.post('/', async (req, res) => {
    let user = await users.findOne({ mail: req.body.mail });
    if (!user) res.status(400).send('mail');
    if(!user.flag) res.send('conf');
    let pass = await bycrypt.compare(req.body.password, user.password);
    if (!pass) res.status(400).send('pass');

    // assegnazione del token JWT 

    const token = jwt.sign({_id : user._id}, process.env.KEY);
    res.header('auth-token', token).send(token);  
});

module.exports = router;