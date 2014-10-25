/* app.js
* main script file for our little application
* */

"use strict";

$(document).ready(function() {
    $('#cancelButton').click(function () {
        $('#confirm-exit-modal').modal();
    });

    $('#confirm-cancelButton').click(function () {
        window.location = 'http://google.com';
    });
});
