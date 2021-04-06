const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const recipes = require('../model/recipes');
const saveds = require('../model/saved');
const users = require('../model/users');
const lists = require('../model/list');

router.get('/', async (req, res) => {
    res.send('sei nelle API di delete');
});

router.delete('/recipes/:id',async function (req, res){
    recipes.deleteOne({_id:req.params.id}).then(
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
router.delete('/users/:id', async function (req, res){
    users.deleteOne({_id:req.params.id}).then(
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

router.delete('/saved/:id', async function (req, res){
    saveds.deleteOne({_id: req.params.id}).then(
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

router.delete('/lists/:id', async function (req, res){
    lists.deleteOne({_id:req.params.id}).then(
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

