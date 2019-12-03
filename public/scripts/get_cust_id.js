/**
 * get_cust_id.js
 * a module to insert a new booking into travelexperts database
 * 
 * Author: Harry Willis
 */
const mysql = require("mysql");

module.exports = {
    findId: function(userFName, userLName, conn, callback) {
        var sql = "SELECT CustomerId FROM `customers` WHERE CustFirstName = ? AND CustLastName = ?";
        
        conn.query(sql, [userFName, userLName], (err, res, fields) => {
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