const express = require('express');
const app = express();
const got = require('got');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const port = 3000;
app.get('/', function(req, res){
    res.send('ciao sono online');
})
app.get('/ricerca/:key', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    got('https://www.giallozafferano.it/ricerca/'+req.params.key+"/").then(response =>{
    const dom = new JSDOM(response.body);
    var dump = [];
    for (var i = 0; i < dom.window.document.getElementsByClassName("gz-card").length; i++) {
        let tmp = {
            "titolo": dom.window.document.getElementsByClassName("gz-card")[i].getElementsByClassName("gz-title")[0].textContent.trim(),
            "link": dom.window.document.getElementsByClassName("gz-card")[i].getElementsByTagName("a")[0].getAttribute("href")
        }
        dump.push(tmp);
        }
        res.send(dump);
    });
});
app.listen(port,()=>{
    console.log('Server up, listening on port ' + port);
});