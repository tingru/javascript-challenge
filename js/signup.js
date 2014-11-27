/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

document.addEventListener("DOMContentLoaded", onLoad);
var originalBorder;                         // to hold the original border style
var invalidBorder = "1px solid #FF0000";    // the invalid border style

function onLoad() {
    var signupForm = document.getElementById("signup");
    var stateField = signupForm.elements["state"];
    var occupationField = document.getElementById("occupation");
    var cancelButton = document.getElementById("cancelButton");

    // store the original border style
    originalBorder = stateField.style.border;

    // populate the state list
    var i;
    for(i = 0; i < usStates.length; ++i) {
        var optn = document.createElement("OPTION");
        optn.value = usStates[i].code;
    	optn.innerHTML = usStates[i].name;
    	stateField.appendChild(optn);
    }

    // add all the event listeners
    signupForm.addEventListener("submit", onSubmit);
    occupationField.addEventListener("change", onOccupationChange);

    // below uses the ugly window.confirm, which is commented out because 
    // it's using JQuery's one now
    // cancelButton.addEventListener("click", onClick);
}

function onSubmit(evt) {
    var valid = true;
    try {
        valid = validateForm(this);
    } catch (exception) {
        valid = false;
        console.log(exception);
        alert(exception);
    }

    // stop form submission if validation failed
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }

    evt.returnValue = valid;
    return valid;
}

function validateForm(signupForm) {
    var isValid = true;

    var requiredStringFields = ['firstName', 'lastName', 'address1', 'city', 'state'];
    for (var i = 0; i < requiredStringFields.length; i++) {
        isValid &= validateString(signupForm.elements[requiredStringFields[i]]);
    }

    var zipField = signupForm.elements["zip"];
    var birthdayField = signupForm.elements["birthdate"];

    // validates zipcode and age differently
    isValid &= validateZipcode(zipField);
    isValid &= validateAge(birthdayField, birthdayField.value);

    return isValid;
}

// validate common string field
function validateString(field) {
    if (0 == field.value.trim().length) {
        field.style.border = invalidBorder;
        return false;
    } else {
        field.style.border = originalBorder;
        return true;
    }
}

// validate zip code field
function validateZipcode(zipField) {
    var zipRegExp = new RegExp("^\\d{5}$")
    if (!zipRegExp.test(zipField.value.trim())) {
        zipField.style.border = invalidBorder;
        return false;
    } else {
        zipField.style.border = originalBorder;
        return true;
    }
}

// validate the age
function validateAge(birthdayField, dob) {
    if (!validateString(birthdayField)) {
        return false;
    }
    var requiredAge = 13;

    var today = new Date();
    dob = new Date(dob);

    var yearsDiff = today.getUTCFullYear() - dob.getUTCFullYear();
    var monthsDiff = today.getUTCMonth() - dob.getUTCMonth();
    var daysDiff = today.getUTCDay() - dob.getUTCDay();
    if (monthsDiff < 0 || (0 === monthsDiff && daysDiff < 0)) {
        yearsDiff--;
    }
    if (yearsDiff < requiredAge) {
        birthdayField.style.border = invalidBorder;
        document.getElementById("birthdateMessage").innerHTML = "Sorry, you must be at least 13 years or older to sign up.";
        return false;
    } else {
        birthdayField.style.border = originalBorder;
        document.getElementById("birthdateMessage").innerHTML = "";
        return true;
    }
        
}

function onOccupationChange() {
    // use getElementsByName here to return an array and pick the first one since the Id tag is missing
    if (this.value == "other") {
        document.getElementsByName("occupationOther")[0].style.display = "block";
    } else {
        document.getElementsByName("occupationOther")[0].style.display = "none";
    }
}

// window.confirm version of the confirmation dialog
function onClick() {
    var resp = window.confirm("Are you really want to leave?");
    if (resp == true) {
        window.location = "http://google.com";
    } else {
        // do nothing and stay on the page
    }
}
