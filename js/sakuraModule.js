// sakuraModule.js
"use strict";

var app = app || {};

var imagePaths = ['./media/blossom.png', './media/blossom-shadow.png'];

/**
 * Define the sakura module and immediately invoke it in an IIFE
 */
app.sakuraModule = (function() {
    var sakura = [],
        imagesLoaded = false,
        images;

    function init() {
        loadImagesWithCallback(imagePaths, function(imageObjects) {
            images = imageObjects;
            imagesLoaded = true;
        });
    }

    function makeSakura(x, y) {
        var blossom;

        if (!imagesLoaded) {
            return;
        }

        blossom = new app.Sakura(x, y, images[0], images[1]);
        sakura.push(blossom);
    }

    function drawSakura() {
        var i;
        for (i = 0; i < sakura.length; i++) {
            sakura[i].draw();
        }
    }

    function drawShadow() {
        var i;
        for (i = 0; i < sakura.length; i++) {
            sakura[i].drawShadow();
        }
    }

    function moveSakura(dt) {
        var i;
        for (i = 0; i < sakura.length; i++) {
            sakura[i].move(dt);
        }
    }

    function clearSakura() {
        sakura = [];
    }

    return {
        init: init,
        makeSakura: makeSakura,
        drawSakura: drawSakura,
        drawShadow: drawShadow,
        moveSakura: moveSakura,
        clearSakura: clearSakura,
    };
}());
