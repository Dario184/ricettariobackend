const express = require('express');
const router = express.Router();
const got = require('got');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const verify = require("./verify");

router.get('/',verify.auth,async(req, res) => {
    got('https://www.giallozafferano.it/Ultime-ricette/').then(response =>{
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
        res.cookie('user',req.user.toString(),{path: "/", sameSite : 'none', secure : 'true'});
        res.json(dump);
    });
});

module.exports = router;