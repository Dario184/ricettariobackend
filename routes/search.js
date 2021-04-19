const express = require('express');
const router = express.Router();
const got = require('got');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

router.get('/:key', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    got('https://www.giallozafferano.it/ricerca/'+req.params.key+"/").then(response =>{
    const dom = new JSDOM(response.body);
    var dump = [];
    for (let  i = 0; i < dom.window.document.getElementsByClassName("gz-card").length; i++) {
        let tmp = {
            "titolo": dom.window.document.getElementsByClassName("gz-card")[i].getElementsByClassName("gz-title")[0].textContent.trim(),
            "link": dom.window.document.getElementsByClassName("gz-card")[i].getElementsByTagName("a")[0].getAttribute("href").split("/").pop(),
            "immagine" : dom.window.document.getElementsByClassName("gz-card")[i].getElementsByTagName("img")[0].getAttribute("data-src").trim()
        }
            dump.push(tmp);
        }
        res.json(dump);
    });
});
router.get('/autocomplete/:key', function(req, res){
    got('https://www.giallozafferano.it/ricerca/'+req.params.key+"/").then(response =>{
    const dom = new JSDOM(response.body);
    var dump = [];
    for(let i = 0; i < 6; i++){
        let tmp = dom.window.document.getElementsByClassName("gz-card")[i].getElementsByClassName("gz-title")[0].textContent.trim();
        dump.push(tmp);
    }
    res.json(dump);
    }, err => {throw err;});
});



module.exports = router;