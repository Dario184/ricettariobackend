const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const recipes = require('../model/recipes');
const saveds = require('../model/saved');
const users = require('../model/users');
const lists = require('../model/list');

router.get('/', async (req, res) => {
    res.send('sei nelle API di update');
});

router.put('/recipes/:id',async function (req, res){
    recipes.replaceOne({_id:req.params.id},req.body).then(
        () => {
            res.json(req.body);
        }
    ).catch(
        (err) => {
            res.status(400);
            res.send(err.message);
        }
    );
});
router.put('/users/:id', async function (req, res){
    users.replaceOne({_id:req.params.id},req.body).then(
        () => {
            res.json(req.body);
        }
    ).catch(
        (err) => {
            res.status(400);
            res.send(err.message);
        }
    );
});

router.put('/saved/:id', async function (req, res){
    saveds.replaceOne({_id: req.params.id},req.body).then(
        () => {
            res.json(req.body);
        }
    ).catch(
        (err) => {
            res.status(400);
            res.send(err.message);
        }
    );
});

router.put('/lists/:id', async function (req, res){
    lists.replaceOne({_id:req.params.id},req.body).then(
        () => {
            res.json(req.body);
        }
    ).catch(
        (err) => {
            res.status(400);
            res.send(err.message);
        }
    );
});
module.exports = router;
