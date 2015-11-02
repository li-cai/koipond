// sound.js
"use strict";

var app = app || {};

// Define Sound module and immediately invoke it in an IIFE
app.sound = (function() {
    var bgAudio = undefined;
    
    function init() {
        bgAudio = document.querySelector("#bgAudio");
        bgAudio.volume = 0.25;
    }
        
    function stopBGAudio() {
        bgAudio.pause();
        bgAudio.currentTime = 0;
    }

    function playBGAudio() {
        bgAudio.play();
    }
        
    // export public interface to this module
    return {
        init: init,
        stopBGAudio: stopBGAudio,
        playBGAudio: playBGAudio,
    };
}());