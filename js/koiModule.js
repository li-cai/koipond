// koiModule.js
"use strict";

/**
 * if app exists use the existing copy
 * else create a new object literal
 */
var app = app || {};

/**
 * Define the koi module and immediately invoke it in an IIFE
 */
app.koiModule = (function() {
    var kois = [],
        koiColorA = 'coral',
        canvasWidth,
        canvasHeight,
        canvas,
        emitter;

    function init(Emitter) {
        canvas = document.querySelector('canvas');
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        emitter = Emitter;

        kois = makeKoi(8);
    }

    function makeKoi(num) {
        var koiArray = [],
            koi, i;

        for (i = 0; i < num; i++) {
            koi = new app.Koi(koiColorA);
            koi.initEmitter(emitter);
            koiArray.push(koi);
        }

        return koiArray;
    }

    function drawKoi() {
        var i;
        for (i = 0; i < kois.length; i++) {
            kois[i].draw();
        }

        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
    }

    function drawShadow() {
        var i;
        for (i = 0; i < kois.length; i++) {
            kois[i].drawShadow();
        } 
    }

    function moveKoi(dt) {
        var center = {x: canvasWidth / 2, y: canvasHeight / 2},
            koi, i;

        for (i = 0; i < kois.length; i++) {
            koi = kois[i];
            koi.move(dt, center);
        }
    }

    return {
        init: init,
        drawKoi: drawKoi,
        drawShadow: drawShadow,
        moveKoi: moveKoi,
    };
}());
