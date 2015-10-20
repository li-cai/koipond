"use strict";

// if app exists use the existing copy
// else create a new empty object literal
var app = app || {};

window.onload = function() {
    app.main.koi = app.koi;
    app.main.init();
}