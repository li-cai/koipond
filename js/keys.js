// keys.js
"use strict";

var app = app || {};

// Define Sound module and immediately invoke it in an IIFE
app.myKeys = (function() {
    var myKeys = {
        keydown: [],
        KEYBOARD: Object.freeze({
            "KEY_LEFT": 37, 
            "KEY_UP": 38, 
            "KEY_RIGHT": 39, 
            "KEY_DOWN": 40,
            "KEY_SPACE": 32,
            "KEY_SHIFT": 16
        }),
    };

    // event listeners
    window.addEventListener("keydown",function(e){
        myKeys.keydown[e.keyCode] = true;
    });
        
    window.addEventListener("keyup",function(e){
        myKeys.keydown[e.keyCode] = false;
        
        // pausing and resuming
        var char = String.fromCharCode(e.keyCode);
        if (char == "p" || char == "P"){
            if (app.main.paused) {
                app.main.resumeGame();
            } else {
                app.main.pauseGame();
            }
        } else if (char == "d" || char == "D") {
            app.main.toggleDebug();
        }
    });
        
    // export public interface to this module
    return myKeys;
}());