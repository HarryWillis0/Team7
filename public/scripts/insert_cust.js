/**
 * insert_cust.js
 * a module to insert new customer data into travelexperts database
 * 
 * Author: Harry Willis
 */
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = {
    insertCust: function(body, conn){
        /* insert sql statement */
        var sql = "INSERT INTO `customers`(`CustomerId`, `CustFirstName`, `CustLastName`, `CustAddress`, `CustCity`, `CustProv`, `CustPostal`, `CustCountry`, `CustHomePhone`, `CustBusPhone`, `CustEmail`, `AgentId`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        /* encrypt password */
        var hash = bcrypt.hashSync(body.password, salt);
        
        /* new data entry, received by app.post("/sendData"... in app.js */
        var data = [null, body.firstname, body.lastname, body.address, body.city, body.province, body.postalCode, body.country, body.homeNum, body.busNum, body.email, 1, hash];
    
        conn.query(sql, data, function(err, result, fields) {
            if (err) throw err;
            console.log("New entry entered");
        });
    }
}