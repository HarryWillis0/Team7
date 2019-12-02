/**
 * app.js
 * handle client requests and serve appropiate pages
 * 
 * Author: Harry Willis
 */
const express = require("express");
const app = express();
const path = require("path");
const inCust = require("./public/scripts/insert_cust");
const conn = require("./public/scripts/DBConnect");
const verify = require("./public/scripts/loginValidate");

/* serve css/js/image files */
app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

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

/* serve post action from form on register.html */
app.post("/sendData", (req, res) => {
    /* insert new customer into database */
    inCust.insertCust(req.body, conn);
    
    /* serve a personalized thank you page */
    res.render('thanks', {greeting: req.body.firstname});
});

/* serve vacation page */
app.get("/vacation.html", (req, res) => {
    res.sendFile(__dirname + "/views/vacation.html");
});

/* serve login page */
app.get("/login", (req, res) => {
    res.render(__dirname + "/views/login.pug");
});

/* serve login post */
app.post("/login", (req, res) => {
    verify.verify(req.body, conn, (result) => {
        /* wait for callback */
        if (result) {
            /* username and password matched, send home */
            res.sendFile(__dirname + "/views/index.html");
        } else {
            res.render("login.pug", {errLogin: "Sorry we couldn't find you..."});
        }
    });
});

/* serve bookings page */
app.get("/bookings.html", (req, res) => {
    res.sendFile(__dirname + "/views/bookings.html");
});

/* serve any other requests to 404 page */
app.use((req, res) => {
    res.sendFile(__dirname + "/views/404.html");
});

/* set up server on port 8000 */
app.listen(8000, (err) => {
    if (err) throw err;
    console.log("Listening on port 8000...");
});

var db = require('./public/scripts/DBConnect');