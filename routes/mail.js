const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const users = require('../model/users');


router.get('/', async (req, res) => {
    res.send('sei sulla API di mail');
});

router.get('/:email', async (req, res) => {
    const email = req.params.email;
    var id;
    await users.findOne({ mail: email}, (err,doc)=>{
        if (err) throw err;
        id = doc.id;
    });
    console.log(id);
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
        html: `<img src='cid:imm' style='height: auto; width: 300px;'/><br><br><br><p><b>Registrazione rossopomodoro</b></p><p>Benvenuto in rossopomodoro: <a href='https://poetic-orb-283600.ew.r.appspot.com/comfirm/${id}'>comferma la registrazione con questo link</a></p><br><br><p>RossoPomodoro</p>`,
        attachments : [{
            filename : 'logo.png', 
            path : 'logo.png', 
            cid : 'imm'
        }] 
      }).catch(error => res.send(error));
      res.send('email inviata con successo');
});
module.exports = router;