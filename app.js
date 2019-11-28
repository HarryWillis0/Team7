/**
 * app.js
 * handle client requests and serve appropiate pages
 * 
 * Author: Harry Willis
 */
const express = require("express");
const app = express();
const inDB = require("./public/scripts/insert_db");

/* serve css/js/image files */
app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

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
    inDB.insToDB(req.body);

    /* serve a thank you page */
    res.sendFile(__dirname + "/views/thanks.html");
});

/* serve vacation page */
app.get("/vacation.html", (req, res) => {
    res.sendFile(__dirname + "/views/vacation.html");
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