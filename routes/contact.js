const express = require("express");
const nodemailer = require("nodemailer");
const config = require('../config.json');
module.exports = () => {
    const router = express.Router();
    const mailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    router.post('/contact', (req, res) => {
        const body = req.body;
        const fullName = body.fullName;
        const email = body.email;
        const subject = body.subject;
        const message = body.message;

        if (!fullName || !email || !subject || !message) {
            res.send({
                success: false,
                message: "Please fill in all the fields."
            })
            return;
        }

        if (!mailRegex.test(email.toLowerCase())) {
            res.send({
                success: false,
                message: "Please provide a valid email address."
            })
            return;
        }

        //TODO SEND EMAIL.

        sendMail(email, subject, 'contact@wesleybreukers.nl', getSenderMail(fullName, email, subject, message));
        sendMail('wesley@vertcodedevelopment.com', subject, email, getCompanyMail(fullName, email, subject, message));

        res.send({
            success: true,
            message: "Successfully received your message."
        })
    })

    return router;
};

async function sendMail(target, subject, from, body) {
    const transporter = nodemailer.createTransport({
        host: config.mail.host,
        port: config.mail.port,
        auth: {
            user: config.mail.auth.user,
            pass: config.mail.auth.pass
        }
    });

    await transporter.sendMail({
        from: from,
        to: target,
        subject: `${subject} | Wesley Breukers`,
        html: body
    });
}

function getSenderMail(name, mail, subject, message) {
    return `
    <html>
        <head>
            <title>Wesley Breukers | Message Sent</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap');
                html {
                    font-family: 'Roboto', sans-serif;
                }
                h1, h2, h3, h4, h5, h6 {
                    font-family: "Source Sans Pro", sans-serif;
                }
                body {
                    text-align: center;
                }
    
                main {
                    margin: 5rem 0 10rem 0;
                }
    
                main p {
                    font-family: 'Roboto', sans-serif;
                    border: 1.5px solid black;
                    border-radius: 48px;
                    margin: 0.5rem 0;
                    padding: 0.5rem 0.75rem 0.5rem 0.75rem;
                }
    
                footer {
                    color: white;
                    width: 100%;
                    padding: 1rem;
                    background: #2d2b2b;
                }
            </style>
        </head>
        <body>
            <header>
                <img src="https://wesleybreukers.nl/src/img/logo/vertcode-logo.png" alt="VC IMG">
            </header>
            <main>
                <h1>Your message was successfully received!</h1>
    
                <h3>Name:</h3>
                <p>${name}</p>
                <h3>Email:</h3>
                <p>${mail}</p>
                <h3>Subject:</h3>
                <p>${subject}</p>
                <h3>Message:</h3>
                <p class="message">${message}</p>
            </main>
            <footer>&copy; Copyright Wesley Breukers. All Rights Reserved</footer>
        </body>
    </html>
    `;
}

function getCompanyMail(name, mail, subject, message) {
    return `
    <html>
        <head>
            <title>Wesley Breukers | Contact Form</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap');
                html {
                    font-family: 'Roboto', sans-serif;
                }
                h1, h2, h3, h4, h5, h6 {
                    font-family: "Source Sans Pro", sans-serif;
                }
                body {
                    text-align: center;
                }
    
                main {
                    margin: 5rem 0 10rem 0;
                }
    
                main p {
                    font-family: 'Roboto', sans-serif;
                    border: 1.5px solid black;
                    border-radius: 48px;
                    margin: 0.5rem 0;
                    padding: 0.5rem 0.75rem 0.5rem 0.75rem;
                }
    
                footer {
                    color: white;
                    width: 100%;
                    padding: 1rem;
                    background: #2d2b2b;
                }
            </style>
        </head>
        <body>
            <header>
                <img src="https://wesleybreukers.nl/src/img/logo/vertcode-logo.png" alt="VC IMG">
            </header>
            <main>
                <h3>Name:</h3>
                <p>${name}</p>
                <h3>Email:</h3>
                <p>${mail}</p>
                <h3>Subject:</h3>
                <p>${subject}</p>
                <h3>Message:</h3>
                <p class="message">${message}</p>
            </main>
            <footer>&copy; Copyright Wesley Breukers. All Rights Reserved</footer>
        </body>
    </html>
    `;
}