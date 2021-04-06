const express = require('express');
const app = express();
const got = require('got');
const mongoose = require('mongoose');
const jsdom = require('jsdom');
const cors = require('cors');
const {JSDOM} = jsdom;
const port = 80;
require('dotenv').config();

app.use(cors());
app.use(express.json());
//definizione delle rotte delle api di crud 

const insertRoute = require('./routes/insert');
app.use('/insert', insertRoute);

const updateRoute = require('./routes/update');
app.use('/update', updateRoute);

const deleteRoute = require('./routes/delete');
app.use('/delete', deleteRoute);

const inspectRoute = require('./routes/inspect');
app.use('/inspect', inspectRoute);

const mailRoute = require('./routes/mail');
app.use('/mail', mailRoute);

const confirmRoute = require('./routes/comfirm');
app.use('/comfirm', confirmRoute);

const loginRoute = require('./routes/login');
app.use('/login', loginRoute);

app.get('/', function(req, res){
    res.send('ciao sono online');
});
// definizione della connessione al cluster database mongodb

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true,useUnifiedTopology: true}).then(() => {console.log('Successful connect')}, err => console.error(err));

app.get('/ricerca/:key', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    got('https://www.giallozafferano.it/ricerca/'+req.params.key+"/").then(response =>{
    const dom = new JSDOM(response.body);
    var dump = [];
    for (let  i = 0; i < dom.window.document.getElementsByClassName("gz-card").length; i++) {
        let tmp = {
            "titolo": dom.window.document.getElementsByClassName("gz-card")[i].getElementsByClassName("gz-title")[0].textContent.trim(),
            "link": dom.window.document.getElementsByClassName("gz-card")[i].getElementsByTagName("a")[0].getAttribute("href"),
            "immagine" : dom.window.document.getElementsByClassName("gz-card")[i].getElementsByTagName("img")[0].getAttribute("data-src").trim()
        }
            dump.push(tmp);
        }
        res.json(dump);
    });
});
app.get('/autocomplete/:key', function(req, res){
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
app.listen(process.env.PORT || port, (err) =>{
    if (err) throw err;
    console.log('Server up, listening on port ' + port);
});