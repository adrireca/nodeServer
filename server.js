import express from "express";
/* Se necesita importar para trabajar con módulos a partir de ES6. */
import path from 'path';
import nodemailer from 'nodemailer';

const __dirname = path.resolve();

const app = express();

const PORT = process.env.PORT || 5000;

/* Middleware. */
app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/contactForm.html');
});

app.post('/', (req, res) => {
    console.log(req.body);

    /* */
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'reyes3190@gmail.com',
            pass: 'tgomsolwaiykzlis'
        }
    })

    /* */
    const mailOptions = {
        from: req.body.email,
        to: 'reyes3190@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    /* */
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.send('error');
        } else {
            console.log(`Email sent: ${info.response}`);
            res.send('success');
        }
    });

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});