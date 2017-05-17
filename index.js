/**
 * Created by Людмила on 16.05.2017.
 */
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 80;

let transporter = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: 'bukireva.portfolio@yandex.ru',
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
        from: 'Site Portfolio 👻 <bukireva.portfolio@yandex.ru>', // sender address
        to: 'bukirevala@gmail.com', // list of receivers
        subject: 'Site-portfolio', // Subject line
        text: `Name: ${req.body.name} \nEmail: ${req.body.email} \nMessage: ${req.body.message}`, // plain text body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.send(JSON.stringify({result: 'success'}));
});

app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});