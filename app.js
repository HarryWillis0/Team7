/**
 * app.js
 * handle client requests and serve appropiate pages
 * 
 * Author: Harry Willis
 */
const express = require("express");
const app = express();
const router = express.Router();
const mysql = require('mysql');
const path = require('path');

/* serve css/js/image files */
app.use(express.static('./public'));
app.use(express.static('./views', { extensions: ["html"] }));
app.set('view engine', 'pug');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "travelexperts"
});



app.use(express.urlencoded({ extended: true }));

/* serve home page */
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

/* serve contact page */
app.get("/contact.html", (req, res) => {
    res.sendFile(__dirname + "/views/contact.html");
});

/* serve register page */
app.get("/register.html", (req, res) => {
    res.sendFile(__dirname + "/views/register.html");
});

/* serve vacation page */
app.get("/vacation.html", (req, res) => {
    res.sendFile(__dirname + "/views/vacation.html");
});

//page to run the query, gets called by ajax later.
app.get("/get-packages", (req, res) => {
    con.query("SELECT * FROM packages", function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.send(result);

    });
})

/* serve any other requests to 404 page */
app.use((req, res) => {
    res.sendFile(__dirname + "/views/404.html");
});

/* set up server on port 8000 */
app.listen(8000, (err) => {
    if (err) throw err;
    console.log("Listening on port 8000...");
});