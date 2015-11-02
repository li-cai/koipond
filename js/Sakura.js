"use strict";

var app = app || {};

// Define Koi class
app.Sakura = function() {
    var MAX_SPEED = 0.1,
        canvas, ctx;

    /**
     * Sakura constructor
     */
    function Sakura(x, y, image, shadowImage) {
        canvas = document.querySelector('canvas');
        ctx = canvas.getContext('2d');

        this.x = x;
        this.y = y;
        this.image = image;
        this.shadowImage = shadowImage;
        this.dimension = getRandom(30, 60);

        this.velocity = {
            x: getRandom(-MAX_SPEED, MAX_SPEED), 
            y: getRandom(-MAX_SPEED, MAX_SPEED),
        };

        this.acceleration = {x: 0, y: 0};
        this.direction = getRandom(0, 2 * Math.PI);
    }

    Sakura.prototype.drawShadow = function() {
        var color = 'gray',
            dimension = this.dimension;

        ctx.save()
        ctx.translate(this.x + 30, this.y + 40);
        ctx.rotate(this.direction);
        ctx.globalAlpha = 0.1;
        ctx.shadowBlur = 14;
        ctx.shadowColor = color;
        ctx.drawImage(this.shadowImage, 0, 0, dimension, dimension)
        ctx.restore();
    }

    Sakura.prototype.draw = function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.direction);
        ctx.globalAlpha = 0.75;
        ctx.drawImage(this.image, 0, 0, this.dimension, this.dimension);
        ctx.restore();
    };

    Sakura.prototype.move = function(dt) {
        this.acceleration.x = getRandom(-0.01, 0.01);
        this.acceleration.y = getRandom(-0.01, 0.01);

        this.velocity.x += this.acceleration.x * dt;
        this.velocity.y += this.acceleration.y * dt;
        this.velocity.x = Math.min(this.velocity.x, MAX_SPEED);
        this.velocity.y = Math.min(this.velocity.y, MAX_SPEED);

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.direction += Math.PI / 3000;

        this.acceleration.x = 0;
        this.acceleration.y = 0;
    };

    return Sakura;
}();