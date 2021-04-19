const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const users = require('../model/users');


router.get('/', async (req, res) => {
    res.send('sei sulla API di mail');
});

router.get('/:email', async (req, res) => {
    var email = req.params.email;
    users.findOne({ mail: email}, async (err,doc)=>{
        if (err) throw err;
        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: "rossopomodoro29@hotmail.com",
                pass: process.env.PASSWORD 
            },
            tls: {
                rejectUnauthorized: false
            }
          });
        let info = await transporter.sendMail({
            from: '"InfoRossoPomodoro" <rossopomodoro29@hotmail.com>', 
            to: email, 
            subject: "RossoPomodoro", 
            html: `<img src='cid:imm' style='height: auto; width: 300px;'/><br><br><br><p><b>Registrazione rossopomodoro</b></p><p>Benvenuto in rossopomodoro: <a href='https://poetic-orb-283600.ew.r.appspot.com/comfirm/${doc._id}'>comferma la registrazione con questo link</a></p><br><br><p>RossoPomodoro</p>`,
            attachments : [{
                filename : 'logo.png', 
                path : 'logo.png', 
                cid : 'imm'
            }] 
          }).catch(error => res.send(error));
    }).then(() =>res.send('email inviata con successo'));
});
module.exports = router;