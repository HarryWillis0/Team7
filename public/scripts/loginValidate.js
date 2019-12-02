/**
 * loginValidate.js
 * verify username and password match for logging in to Travel Experts webpage
 * 
 * Author: Harry Willis
 */
const bcrypt = require("bcryptjs");
module.exports = { 
    verify: function(body, conn, callback) {
        var username = body.userName;
        var password = body.password;
        var result;
        var sql = 'SELECT * FROM `customers` WHERE CustEmail = ?';

        /* see if we can find a matching username */
        conn.query(sql, [username], (err, res, fields) => {
            if (err) throw err;
        
            if (res.length > 0) {
                /* found a matching username */
                /* test password hash from DB against supplied one */
                if (bcrypt.compareSync(password, res[0].password)) {
                    /* username and password match - callback with true */
                    console.log("user and pass match...");
                    result = true;
                    callback(result);
                }
            }
            
            if (result != true) {
                /* username not found or password didn't match */
                console.log("couldn't find a match");
                callback(result);
            }
        });
    }
}