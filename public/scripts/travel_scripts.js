/**
 * travel_scripts.js
 * An external script file for Project 1 of the OOSD program at SAIT
 */

/**
 * validate()
 * A function to validate the info entered on the registration webpage
 * @return confirm if data is valid
 *         false if data is invalid (empty field or malformed Canadian postal code) 
 * 
 * Author: Harry Willis
 */
function validate() {
    var formData = document.forms[0];
    var postReg = /^[a-z]\d[a-z](\s|-)*\d[a-z]\d$/i;
    var errorMsg = "";
    var flag = false;

    /* loop through fields testing for empty data */
    for (i = 0; i < formData.elements.length; i++) {

        /* make sure not sumbit/reset buttons */
        if (formData.elements[i].type == "text" || formData.elements[i].type == "password") {
            /* test for empty field */
            if (formData.elements[i].value == "") {
                flag = true;
            } 
        }
    }

    /* test postal code against regex */
    if (!postReg.test(document.getElementById("postal").value)) {
        flag = true;
        errorMsg += "Invalid postal code";
    }

    /* see if some data was invalid */
    if (flag) {
        errorMsg += "<br />Required fields are missing"
        document.getElementById("dataMiss").innerHTML = errorMsg;
        return false;
    }

    /* data is valid, get confirmation from user to register */
    return confirm("Do you want to continue registering?");
}

/**
 * showDesc()
 * A function to make the discription of a field in registration form visible
 * @param idToShow - input id of which we show the description for 
 * 
 * Author: Harry Willis
 */
function showDesc(idToShow) {
    document.getElementById(idToShow).style.visibility = "visible";
}

/**
 * hideDesc()
 * A function to make the discription of a field in registration form hidden
 * @param idToHide - input id of which we hide the description for 
 * 
 * Author: Harry Willis
 */
function hideDesc(idToHide) {
    document.getElementById(idToHide).style.visibility = "hidden";
}