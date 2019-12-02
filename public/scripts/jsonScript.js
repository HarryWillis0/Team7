$.ajax({
    url: './get-packages',
    context: document.body
}).done((result) => {
    console.log(result)
})

// $(document).ready(function() {

//     $("#retrieve-data").click(function() {

//         var displayData = $("#display-data");

//         displayData.text("Loading Data from Database. . .");

//         $.ajax({
//             type: "GET",
//             url: "/get-packages",
//             success: function(result) {
//                 console.log(result);
//                 var output = "<table><thead><tr><th>Name</th><th>Provider</th><th>URL</th></thead><tbody>";

//                 for (var i in result) {
//                     output +=
//                         "<tr><td>" +
//                         result[i].PkgName +
//                         "</td><td>" +
//                         result[i].PkgStartDate +
//                         "</td><td>" +
//                         result[i].PkgEndDate +
//                         "</td><td>" +
//                         result[i].PkgDesk +
//                         "</td><td>" +
//                         result[i].PkgBasePrice +
//                         "</td></tr>";
//                 }
//                 output += "</tbody></table>";
//                 console.log(output);
//                 displayData.html(output);
//                 $("table").addClass("table");
//             }

//         })

//     })

// });