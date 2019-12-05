/**
 * insert_booking.js
 * a module to insert a new booking into travelexperts database
 * 
 * Author: Harry Willis
 */
const mysql = require("mysql");
const moment = require("moment");

module.exports = {
    insertBook: function(body, id, conn) {
        /* insert sql statement */
        var sql = "INSERT INTO `bookings`(`BookingId`, `BookingDate`, `BookingNo`, `TravelerCount`, `CustomerId`, `TripTypeId`, `PackageId`) VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        /* data to enter */
        var data = [null, moment().format(), 'MMMMM', body.numTrav, id, body.tripType, null];
        
        conn.query(sql, data, function(err, result, fields) {
            if (err) throw err;
            console.log("New booking entered");
        });
    }
}