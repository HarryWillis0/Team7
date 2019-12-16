/**
 * app.js
 * handle client requests and serve appropiate pages
 * 
 * Authors: Harry Willis, Evan Tucker, Joe Yang
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
app.use(express.static('./public'));

/* tell express what template engine we are using*/
app.set('view engine', 'pug');

/* tell express where to look for pug files */
app.set("views", path.join(__dirname, "views"));

/* parse incoming requests */
app.use(express.urlencoded({ extended: true }));

/* serve home page */
app.get("/", (req, res) => {
    sess = req.session;

    if (sess.firstName) {
        res.render("index", { logOut: "Logout", bookIfIn: "Book Now!" });
    } else {
        res.render("index", { logIn: "Login" });
    }
});

/* serve contact page */
app.get("/contact", (req, res) => {
    sess = req.session;

    if (sess.firstName) {
        res.render("contact", {logOut: "Logout", bookIfIn: "Book Now!"});
    } else {
        res.render("contact", {logIn: "Login"});
    }
});

/* serve register page */
app.get("/register", (req, res) => {
    sess = req.session;

    res.render(__dirname + "/views/register");
});

/* serve post action from form on register.html */
app.post("/sendData", (req, res) => {
    sess = req.session;

    /* insert new customer into database */
    inCust.insertCust(req.body, conn);

    /* log them in */
    sess.firstName = req.body.firstname;
    sess.lastName = req.body.lastname;
    sess.email = req.body.email;

    /* serve a personalized thank you page */
    res.render('thanks', { greeting: "for registering with us " + sess.firstName + "!", logOut: "Logout" });
});

/* serve vacation page */
app.get("/vacation", (req, res) => {
    sess = req.session;

    if (sess.firstName) {
        res.render("vacation", {logOut: "Logout", bookIfIn: "Book Now!"});
    } else {
        res.render("vacation", {logIn: "Login"});
    }
});

/* serve login page */
app.get("/login", (req, res) => {
    sess = req.session;

    res.render("login");
});

/* serve login post */
app.post("/login", (req, result) => {
    sess = req.session;

    verify.verify(req.body, conn, (success) => {
        /* act on callback */
        if (success) {
            /* login successful */

            /* get their name from db to update session for some personalization */
            var getName = "SELECT `CustFirstName`, `CustLastName` FROM `customers` WHERE CustEmail = ?";

            conn.query(getName, [req.body.userName], (err, res, fields) => {
                /* this has to have a result if login was successful */

                /* set some session properties */
                sess.firstName = res[0].CustFirstName;
                sess.lastName = res[0].CustLastName;
                sess.email = req.body.userName;
                
                /* username and password matched, send home */
                result.render("index", { logOut: "Logout", bookIfIn: "Book now!" });
            });
        } else {
            result.render("login", { errLogin: "Sorry we couldn't find you..." });
        }
    });
});

/* serve bookings page */
app.get("/bookings", (req, res) => {
    sess = req.session;

    /* serve different options on page depending if user logged in */
    if (sess.firstName) {
        res.render(__dirname + "/views/bookings.pug", {loggedIn: "Book your trip!", logOut: "Logout"});
    } else {
        res.render("login", { needInToBook: "Sorry you must login before booking." });
    }
});

/* serve bookings post */
app.post("/book", (req, res) => {
    sess = req.session;

    /* get customerID */
    getCustId.findId(sess.firstName, sess.lastName, sess.email, conn, (id) => {
        /* act on callback */
        if (id) {
            /* create booking */
            inBk.insertBook(req.body, id, conn);

            /* serve personalized thank you page */
            res.render("thanks.pug", { greeting: "for taking an adventure with us " + sess.firstName + "!", logOut: "Logout" });
        } else {
            console.log("couldn't find user to make booking");

            res.render("bookings.pug", { errFind: "Sorry we couldn't find you in our system. You may need to register first." });
        }
    });
});

/* serve logout */
app.use("/logout", (req, res) => {
    /* save customer name */
    var currFName = sess.firstName;

    /* close session and send customer to personalized thanks page */
    req.session.destroy((err) => {
        if (err) throw err;

        /* serve personalized thank you page */
        res.render("thanks.pug", {greeting: "for visiting " + currFName + ". Hope to see you soon!", logIn: "Login"});
    })
});

//page to run the query, gets called by ajax later.
app.get("/get-packages", (req, res) => {
    conn.query("SELECT * FROM packages WHERE PkgStartDate > date_add(NOW(), INTERVAL -1 MONTH)", function(err, result) {
        if (err) throw err;
        //console.log(result);
        res.send(result);

    });
});

app.get("/get-agency1", function (req, res) {
    conn.query("SELECT AgencyId, AgncyAddress,AgncyPhone,AgncyCity,AgncyPostal FROM agencies WHERE `AgencyId` = 1", function (err, result) {
        if (err) throw err;
        // console.log(result)
        res.send(result)
    })
});

app.get("/get-agency2", function (req, res) {
    conn.query("SELECT AgencyId, AgncyAddress,AgncyPhone,AgncyCity,AgncyPostal FROM agencies WHERE `AgencyId` = 2", function (err, result) {
        if (err) throw err;
        // console.log(result)
        res.send(result)
    })
});

app.get("/get-agents1", function (req, res) {
    conn.query("SELECT * FROM `agents` WHERE `AgencyId` = 1", function (err, result) {
        if (err) throw err;
        res.send(result)
    })
});
app.get("/get-agents2", function (req, res) {
    conn.query("SELECT * FROM `agents` WHERE `AgencyId` = 2", function (err, result) {
        if (err) throw err;
        res.send(result)
    })
});

/* serve any other requests to 404 page */
app.use((req, res) => {
    res.render(__dirname + "/views/404");
});

/* set up server on port 8000 */
app.listen(8000, (err) => {
    if (err) throw err;
    console.log("Listening on port 8000...");
});
