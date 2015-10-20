// koiModule.js
"use strict";

/**
 * if app exists use the existing copy
 * else create a new object literal
 */
var app = app || {};

/**
 * Define the .sound module and immediately invoke it in an IIFE
 */
app.koiModule = (function() {
    var kois = [],
        MAX_SPEED = 2,
        CANVAS_WIDTH,
        CANVAS_HEIGHT,
        ctx;

    function init(canvas, context) {
        ctx = context;
        CANVAS_WIDTH = canvas.width;
        CANVAS_HEIGHT = canvas.height;

        kois = makeKoi(8);
    }

    function makeKoi(num) {
        var koiArray = [],
            koi, draw, drawShadow, move, seekCenter, i;

        seekCenter = function() {
            var center = {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2};
            var displacement = {
                x: center.x - this.x,
                y: center.y - this.y,
            }
            return displacement;
        }

        draw = function() {
            ctx.save();

            ctx.translate(this.x, this.y);
            ctx.rotate(this.direction);
            ctx.scale(2, 1);

            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
            ctx.closePath();            
            ctx.fillStyle = 'coral';
            ctx.fill();

            ctx.restore();

            // DEBUG
            // ctx.beginPath();
            // ctx.moveTo(this.x, this.y);
            // ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            // ctx.closePath();
            // ctx.strokeStyle = 'red';
            // ctx.stroke();
            //ctx.restore();
        }

        drawShadow = function() {
            ctx.save()
            ctx.translate(this.x + 40, this.y + 60);
            ctx.rotate(this.direction);
            ctx.scale(2, 1);
            ctx.beginPath();
            ctx.arc(0, 0, this.radius + 2, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = 'gray';
            ctx.fill();
            ctx.restore();
        }

        move = function(dt) {
            var force = this.seekCenter();
            this.acceleration.x = force.x / this.mass;
            this.acceleration.y = force.y / this.mass;
            
            this.velocity.x += this.acceleration.x * dt;
            this.velocity.y += this.acceleration.y * dt;
            this.velocity.x = Math.min(this.velocity.x, MAX_SPEED);
            this.velocity.y = Math.min(this.velocity.y, MAX_SPEED);

            this.x += this.velocity.x;
            this.y += this.velocity.y;

            this.direction = Math.atan2(this.velocity.y, this.velocity.x);

            this.acceleration.x = 0;
            this.acceleration.y = 0;
        }

        for (i = 0; i < num; i++) {
            koi = {};

            koi.x = getRandom(0, CANVAS_WIDTH);
            koi.y = getRandom(0, CANVAS_HEIGHT);

            koi.radius = 15;
            koi.mass = 400;
            koi.velocity = {x: getRandom(-2, 2), y: getRandom(-2, 2)};
            koi.acceleration = {x: 0, y: 0};
            koi.direction = 0;
            koi.seekCenter = seekCenter;
            koi.draw = draw;
            koi.drawShadow = drawShadow;
            koi.move = move;

            Object.seal(koi);
            koiArray.push(koi);
        }

        return koiArray;
    }

    function drawKoi() {
        var koi, i;

        for (i = 0; i < kois.length; i++) {
            koi = kois[i];
            koi.drawShadow();
        }

        for (i = 0; i < kois.length; i++) {
            koi = kois[i];
            koi.draw();
        }
    }

    function moveKoi(dt) {
        var koi, i;

        for (i = 0; i < kois.length; i++) {
            koi = kois[i];
            koi.move(dt);
        }
    }

    return {
        init: init,
        drawKoi: drawKoi,
        moveKoi: moveKoi,
    }
}());
