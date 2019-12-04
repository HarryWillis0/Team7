const express = require("express");
const mysql= require ('mysql');
const app = express();

app.use(express.static("views", {"extensions":["html", "htm"]}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/views/register.html");
});

app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/views/contact.html");
});

app.get("/get-agency", function (req, res) {
    conn.query("SELECT AgencyId, AgncyAddress,AgncyPhone FROM agencies", function (err, result) {
        if (err) throw err;
        // console.log(result)
        res.send(result)
    })
});
app.get("/get-agents", function (req, res) {
    conn.query("SELECT * FROM agents", function (err, result) {
        if (err) throw err;
        res.send(result)
    })
});

app.listen(3000, () => {
    console.log("Listening on port 3000. Server started.");
});