/**
 * app.js
 * handle client requests and serve appropiate pages
 * 
 * Author: Harry Willis
 */
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const inCust = require("./public/scripts/insert_cust");
const conn = require("./public/scripts/DBConnect");
const verify = require("./public/scripts/login_validate");
const getCustId = require("./public/scripts/get_cust_id");
const inBk = require("./public/scripts/insert_booking");

/* init session */
app.use(session({
    secret: 'topsecret',
    saveUninitialized: true,
    resave: true
}));
var sess;

/* serve css/js/image files */
app.use(express.static("public"));

/* parse incoming requests */
app.use(express.urlencoded({extended: true}));

/* tell express where to look for pug files */
app.set("views", path.join(__dirname, "views"));

/* tell express we are using pug template engine */
app.set("view engine", "pug");

/* serve home page */
app.get("/", (req, res) => {
    sess = req.session;

    res.sendFile(__dirname + "/views/index.html");
});

/* serve contact page */
app.get("/contact.html", (req, res) => {
    sess = req.session;

    res.sendFile(__dirname + "/views/contact.html");
});

/* serve register page */
app.get("/register.html", (req, res) => {
    sess = req.session;

    res.sendFile(__dirname + "/views/register.html");
});

/* serve post action from form on register.html */
app.post("/sendData", (req, res) => {
    sess = req.session;

    /* insert new customer into database */
    inCust.insertCust(req.body, conn);
    
    sess.firstName = req.body.firstname;
    
    /* serve a personalized thank you page */
    res.render('thanks', {greeting: "for registering with us " + sess.firstName + "!"});
});

/* serve vacation page */
app.get("/vacation.html", (req, res) => {
    sess = req.session;

    res.sendFile(__dirname + "/views/vacation.html");
});

/* serve login page */
app.get("/login", (req, res) => {
    sess = req.session;

    res.render(__dirname + "/views/login.pug");
});

/* serve login post */
app.post("/login", (req, res) => {
    sess = req.session;

    verify.verify(req.body, conn, (result) => {
        /* act on callback */
        if (result) {
            /* login successful */
            
            /* get their name from db to update session for some personalization */
            var getName = "SELECT `CustFirstName`, `CustFirstName` FROM `customers` WHERE CustEmail = ?";
            
            conn.query(getName, [req.body.userName], (err, res, fields) => {
                /* this has to have a result if login was successful */

                /* set some session properties */
                sess.firstName = res[0].CustFirstName;
                sess.lastName = res[0].CustLastName;
                sess.email = req.body.userName;
            });
            
            /* username and password matched, send home */
            res.sendFile(__dirname + "/views/index.html");
        } else {
            res.render("login.pug", {errLogin: "Sorry we couldn't find you..."});
        }
    });
});

/* serve bookings page */
app.get("/bookings", (req, res) => {
    sess = req.session;

    res.render(__dirname + "/views/bookings.pug");
});

/* serve bookings post */
app.post("/book", (req, res) => {    
    sess = req.session;

    /* get customerID */
    getCustId.findId(req.body.userFName, req.body.userLName, conn, (id) => {
        /* act on callback */
        if (id) {
            /* create booking */
            inBk.insertBook(req.body, id, conn);
            
            /* serve personalized thank you page */
            res.render("thanks.pug", {greeting: "for taking an adventure with us " + req.body.userFName + "!"});
        } else {
            console.log("couldn't find user to make booking");

            res.render("bookings.pug", {errFind: "Sorry we couldn't find you in our system. You may need to register first."});
        }
    });
});

/* serve logout */
app.post("/logout", (req, res) => {
    /* save customer name */
    var currFName = sess.firstName;

    /* close session and send customer to personalized thanks page */
    req.session.destroy((err) => {
        if(err) throw err;
        res.render("thanks.pug", {greeting: "for visiting " + currFName + ". Hope to see you soon!"});
    })
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