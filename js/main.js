"use strict";

/**
 * If app exists use the existing copy
 * else create a new object literal
 */
var app = app || {};

app.main = {
    canvas: undefined,
    ctx: undefined,
    koi: undefined,
    lastTime: 0,

    init: function() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.koi.init(this.canvas, this.ctx);

        this.update();
    },

    calculateDeltaTime: function() {
        // what's with (+ new Date) below?
        // + calls Date.valueOf(), which converts it from an object to a    
        // primitive (number of milliseconds since January 1, 1970 local time)
        var now, fps;
        now = (+new Date); 
        fps = 1000 / (now - this.lastTime);
        fps = clamp(fps, 12, 60);
        this.lastTime = now; 
        return 1 / fps;
    },

    update: function() {
        var dt = this.calculateDeltaTime();

        this.animationId = requestAnimationFrame(this.update.bind(this));

        this.koi.moveKoi(dt);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.koi.drawKoi();
    },
};
