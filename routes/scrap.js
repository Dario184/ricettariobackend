const express = require('express');
const router = express.Router();
const got = require('got');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

router.get('/', async (req, res) =>{
    res.send("sei nella API di scraping ");
});

router.get('/:key', async (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    got('https://ricette.giallozafferano.it/'+req.params.key).then(
        response => {
            const dom = new JSDOM(response.body);
            var arr = [];
            var ingredienti = [];
            var categorie = [];
            var procedimento = [];
            var immagine;
            for(let item  of dom.window.document.getElementsByClassName("gz-name-featured-data")){
                item.innerHTML.split(':').forEach((itemi) => {
                    itemi = itemi.replace(/<[^>]*>/g, '').trim();
                    arr.push(itemi);
                });
            }
            for(let item of dom.window.document.getElementsByClassName("gz-ingredient")){
                ingredienti.push(item.getElementsByTagName("a")[0].innerHTML+' '+item.getElementsByTagName("span")[0].innerHTML.replace(/\t/g,'').replace(/\n/g,''));
            }
            for(let item of dom.window.document.getElementsByClassName("gz-breadcrumb")[0].getElementsByTagName("li")){
                categorie.push(item.getElementsByTagName("a")[0].innerHTML);
            }
            for(let item of dom.window.document.getElementsByClassName("gz-content-recipe-step")){
                procedimento.push(item.getElementsByTagName("p")[0].innerHTML.replace(/<span class=\"num-step\"([\s\S]*?)<\/span>/gi, ''))
            }
            if(dom.window.document.getElementsByClassName("gz-featured-image")[0] == null){
                immagine = dom.window.document.getElementsByClassName("gz-featured-image-video")[0].getElementsByTagName("img")[0].getAttribute("src");
            } else immagine = dom.window.document.getElementsByClassName("gz-featured-image")[0].getElementsByTagName("img")[0].getAttribute("data-src");
            let info = {
                titolo : dom.window.document.getElementsByClassName("gz-title-recipe")[0].innerHTML,
                descrizione : dom.window.document.getElementsByClassName("gz-content-recipe")[0].getElementsByTagName("p")[0].innerHTML.replace(/<[^>]*>/g, ''),
                immagine : immagine,
                ingredienti : ingredienti,
                categorie : categorie,
                procedimento : procedimento,
                difficoltà : arr[1],
                preparazione : arr[3],
                cottura : arr[5],
                dosi : arr[7],
                costo : arr[9]
            }
            got.post('https://poetic-orb-283600.ew.r.appspot.com/insert/recipes/',{json:info}).then(() => res.json(info) ,error => console.log(error));
            }, err => res.send(err.message)
    );
});

module.exports = router;