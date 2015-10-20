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

    init: function() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.koi.init(this.ctx);

        console.log(this.koi);
        this.update();
    },

    update: function() {
        this.animationId = requestAnimationFrame(this.update.bind(this));
        this.koi.draw(this.ctx);
    },
};