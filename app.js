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
    inCust.insertCust(req.body);
    
    /* serve a personalized thank you page */
    res.render('thanks', {greeting: req.body.firstname});
});

/* serve vacation page */
app.get("/vacation.html", (req, res) => {
    res.sendFile(__dirname + "/views/vacation.html");
});

/* serve login page */
app.get("/login.html", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
});

/* serve login post */
app.post("/login", (req, res) => {
        
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