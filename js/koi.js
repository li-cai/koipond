// koi.js
"use strict";

/**
 * if app exists use the existing copy
 * else create a new object literal
 */
var app = app || {};

/**
 * Define the .sound module and immediately invoke it in an IIFE
 */
app.koi = (function() {
    var ctx;

    function init(context) {
        ctx = context;
    }

    function draw() {
        ctx.fillStyle = 'coral';

        ctx.save();

        ctx.translate(500, 500);
        ctx.scale(2, 1);
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    return {
        init: init,
        draw: draw,
    }
}());