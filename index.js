const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
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

const searchRoute = require('./routes/search');
app.use('/search', searchRoute);

const scraRoute = require('./routes/scrap');
app.use('/scrap', scraRoute);

app.get('/', function(req, res){
    res.send('ciao sono online');
});
// definizione della connessione al cluster database mongodb

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true,useUnifiedTopology: true}).then(() => {console.log('Successful connect')}, err => console.error(err));

//inizializzazione della porta 

app.listen(process.env.PORT || port, (err) =>{
    if (err) throw err;
    console.log('Server up, listening on port ' + port);
});