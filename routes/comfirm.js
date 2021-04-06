const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const users = require('../model/users');

router.get('/', async (req,res) => {
    res.send('sei nella api di comferma');
});

router.get('/:id', async (req, res) =>{
    users.findByIdAndUpdate(req.params.id, { flag: true }).then(() => res.redirect('https://poetic-orb-283600.web.app/Login'), err => console.log(err));
});
module.exports = router;