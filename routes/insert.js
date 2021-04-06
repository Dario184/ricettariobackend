const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const got = require('got');
const recipes = require('../model/recipes');
const users = require('../model/users');
const saved = require('../model/saved');
const lists = require('../model/list');
const bycrypt = require('bcrypt');



router.get('/',async function(req, res){
    res.send('sei nella api di insert');
});

router.post('/recipes',async function (req, res){
    const recipe = new recipes(req.body);
    recipe.save().then(
        () => {
            res.json(recipe);
        }
    ,(err) => {
            res.status(400);
            res.send(err.message);
        }
    );
});
router.post('/users', async function (req, res){
    // hashing della password 
    const salt = await bycrypt.genSalt(10);
    req.body.password = await bycrypt.hash(req.body.password, salt);

    //salva le informazioni dell'utente
    const user = new users(req.body);
    user.save().then(
        () => {
            // invia la mail con il codice di comferma
            got('https://poetic-orb-283600.ew.r.appspot.com/mail/'+req.body.mail).then(() => res.json(user));
        }
    ,(err) => {
            res.status(400);
            res.send(err.message);
        }
    );
});

router.post('/saved', async function (req, res){
    const save = new saved(req.body);
    save.save().then(
        () => {
            res.json(save);
        }
    ,(err) => {
            res.status(400);
            res.send(err.message);
        }
    );
});

router.post('/lists', async function (req, res){
    const list = new lists(req.body);
    list.save().then(
        () => {
            res.json(list);
        }
    ,(err) => {
            res.status(400);
            res.send(err.message);
        }
    );
});

module.exports = router;