const mysql = require('mysql');
const htto = require('http');
const express = require('express');
const router = express.Router();

var html = '';

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "travelexperts"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query("SELECT * FROM packages", function(err, result) {
    if (err) throw err;
    console.log(result);

});

module.exports = html;