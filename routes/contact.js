const express = require("express");
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

        res.send({
            success: true,
            message: "Successfully received your message."
        })
    })

    return router;
};