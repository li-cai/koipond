"use strict";

// if app exists use the existing copy
// else create a new empty object literal
var app = app || {};

// load modules
window.onload = function() {
    app.main.koi = app.koiModule;
    app.main.sakura = app.sakuraModule;
    app.main.myKeys = app.myKeys;
    app.main.Emitter = app.Emitter;
    app.main.init();
    app.main.sound = app.sound;
    app.main.sound.init();
    app.main.sound.playBGAudio();
}

window.onblur = function() {
    app.main.pauseGame();
    app.main.hideWelcome();
}

window.onfocus = function() {
    app.main.resumeGame();
}
