function verify(myform) {
    if (myform.firstName.value == "")
    {
        alert("First name cannot be empty!");
        return false;
    }
    else if (myform.lastName.value == "")
    {
        alert("Last name cannot be empty!");
        return false;
    }
    else if (myform.password.value == "")
    {
        alert("Password cannot be empty!");
        return false;
    }
    else if (myform.confirmPassword.value == "")
    {
        alert("Please confirm your password!");
        return false;
    }
    else if (myform.confirmPassword.value != myform.password.value)
    {
        alert("Different password entered");
        return false;
    }
    else
        return confirm("Continue submitting?");
}
function verifyReg() {
    var myReg = /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/;
    if (myReg.test(document.getElementById("postal").value))
    {
        alert("Postal matched");
    }
    else
    {
        alert("Postal not matched, please enter a valid postal");
    }
}