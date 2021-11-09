const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const mailRegex = new RegExp("/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i");

app.use(express.json());
app.use(express.urlencoded( { extended: false } ));
app.use(express.static(__dirname + '/public'));

app.post('/contact', (req, res) => {
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

    res.send({
        success: true,
        message: "Successfully received your message."
    })
})

app.listen(port, () => {
  console.log(`Started express server on port ${port}`)
})