/**
 * validation.js
 * A script for validating customer data information entered on register.html webpage
 * 
 * Author: Harry Willis
 * Date modified: 11/16/19
 */

/**
 * validate()
 * @param none
 * @return true if data is valid
 *         false if data is invalid
 */
function validate() {
    var formData = document.forms[0];
    var postReg = /^[a-z]\d[a-z](\s|-)*\d[a-z]\d$/i;
    var errorMsg = "";

    /* loop through fields testing for empty data */
    for (i = 0; i < formData.elements.length; i++) {

        /* make sure not sumbit/reset buttons */
        if (formData.elements[i].type == "text" || formData.elements[i].type == "password") {
            /* test for empty field */
            if (formData.elements[i].value == "") {
                errorMsg += formData.elements[i].name + " must have a value<br />";
            } 
        }
    }

    if (!postReg.test(document.getElementById("postal").value)) {
        errorMsg += "invalid postal code";
    }

    if (errorMsg != "") {
        document.getElementById("dataMiss").innerHTML = errorMsg;
        return false;
    }

    return confirm("Do you want to continue registering?");
}