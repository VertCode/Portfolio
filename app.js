const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded( { extended: false } ));
app.use(express.static(__dirname + '/public'));

fs.readdirSync(__dirname + "/routes").forEach((file) => {
    app.use(require(__dirname + "/routes/" + file)())
    console.log("Registered " + file + " router.")
})

app.listen(port, () => {
  console.log(`Started express server on port ${port}`)
})