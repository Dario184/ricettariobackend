const express = require('express');
const mongoose = require('mongoose');
const users = require('../model/users');
const router = require('./mail');
const routes = express.Router();

router.get('/', async(req,res) => {
    res.send('sei nella API di comferma');
});