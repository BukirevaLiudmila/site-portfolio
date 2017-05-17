/**
 * Created by Людмила on 16.05.2017.
 */
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bukirevala@gmail.com',
        pass: 'Passw0rd18'
    }
});

app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/send-mail', (req, res) => {
    console.log(req.body);
    let mailOptions = {
        from: `${req.body.name} 👻 <${req.body.email}>`, // sender address
        to: 'bukirevala@gmail.com', // list of receivers
        subject: 'Site-portfolio', // Subject line
        text: req.body.message, // plain text body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.send(JSON.stringify({result: 'success'}));
});
/*
 app.get('/', function (req, res) {
 res.send()
 });*/

app.listen('3030', () => {
    console.log('Server start on port 3030');
});