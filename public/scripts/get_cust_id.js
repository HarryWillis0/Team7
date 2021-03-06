/**
 * get_cust_id.js
 * a module to get a customer's id, if it exists, from travelexperts database
 * 
 * Author: Harry Willis
 */
const mysql = require("mysql");

module.exports = {
    findId: function(userFName, userLName, email, conn, callback) {
        var sql = "SELECT CustomerId FROM `customers` WHERE CustFirstName = ? AND CustLastName = ? AND CustEmail = ?";
        
        conn.query(sql, [userFName, userLName, email], (err, res, fields) => {
            if (res.length > 0) {
                /* found user in database */
                callback(res[0].CustomerId);
            } else {
                /* didnt find user */
                callback(false);
            }
        });
    }
}