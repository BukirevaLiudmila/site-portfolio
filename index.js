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
    const {name, email, message} = req.body;
    let result = {
        textResult: 'Сообщение успешно отправлено',
        classResult: 'sucsess-text'
    };
    console.log(req.body);
    let mailOptions = {
        from: 'Site Portfolio 👻 <bukireva.portfolio@yandex.ru>', // sender address
        to: 'bukirevala@gmail.com', // list of receivers
        subject: 'Site-portfolio', // Subject line
        text: `Name: ${name} \nEmail: ${email} \nMessage: ${message}`, // plain text body
    };
    if (name && name.length > 0 && email && email.length > 0 && message && message.length > 0) {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                result.textResult = 'Ошибка отправки';
                result.classResult = 'error-text';
                console.log('error status');
                console.error(error);
            } else {
                console.log('Message %s sent: %s', info.messageId, info.response);
            }
            res.send(JSON.stringify(result));
        });
    } else {
        console.error('not valid data');
        result.textResult = 'Заполнены не все поля';
        result.classResult = 'error-text';
        res.send(JSON.stringify(result));
    }
});

app.listen(port, () => {
    console.log(`Server start on port ${port}`);
});