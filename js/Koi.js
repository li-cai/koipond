"use strict";

var app = app || {};

// Define Koi class
app.Koi = function() {
    var MAX_SPEED = 2,
        TAIL_DELTA = 25,
        tailDistance,
        bubbles;

    /**
     * Koi constructor
     * @param {string} color
     */
    function Koi(color) {
        this.color = color;

        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.x = getRandom(0, this.canvas.width);
        this.y = getRandom(0, this.canvas.height);

        this.radius = getRandom(9, 11);
        this.mass = 1000;
        this.velocity = {
            x: getRandom(-MAX_SPEED, MAX_SPEED), 
            y: getRandom(-MAX_SPEED, MAX_SPEED),
        };
        this.acceleration = {x: 0, y: 0};
        this.direction = 0;
        this.endpoint = {x: -60, y: 0};

        tailDistance = Math.pow(this.endpoint.x, 2) + Math.pow(this.endpoint.y, 2);

        this.seekPosition = function(x, y) {
            var displacement = {
                x: x - this.x,
                y: y - this.y,
            }
            return displacement;
        }

        this.drawKoi = function(color) {
            var ctx = this.ctx,
                x1 = 4 * this.radius,
                y1 = this.radius * 1.6,
                x2 = 4 * this.radius,
                y2 = -this.radius * 1.6,
                endpoint0 = {x: this.radius * 10, y: 0},
                endpoint = this.endpoint,
                ctrlPt0 = {x: endpoint0.x - 5, y: this.radius * 2},
                ctrlPt1 = {x: x1 - 65, y: y1 - 10},
                ctrlPt2 = {x: x1 - 65, y: y1 - 15};

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.quadraticCurveTo(ctrlPt0.x, ctrlPt0.y, endpoint0.x, endpoint0.y);
            ctx.quadraticCurveTo(ctrlPt0.x, -ctrlPt0.y, x2, y2);
            ctx.quadraticCurveTo(ctrlPt2.x, ctrlPt2.y, endpoint.x, endpoint.y);
            ctx.quadraticCurveTo(ctrlPt1.x, ctrlPt1.y, x1, y1);
            ctx.closePath();

            ctx.fillStyle = color;
            ctx.fill();

            // draw eyes
            ctx.save();
            this.drawEye(endpoint0.x, endpoint0.y);
            ctx.restore();

            ctx.save();
            ctx.scale(1, -1);
            this.drawEye(endpoint0.x, endpoint0.y);
            ctx.restore();

            // draw fin
            ctx.save();
            this.drawFin(x1, y1);
            ctx.restore();

            ctx.save();
            ctx.scale(1, -1);
            this.drawFin(x1, y1);
            ctx.restore();
        }

        this.drawEye = function(x, y) {
            var ctx = this.ctx;
            ctx.translate(x - 12, y + 9);
            ctx.scale(1.5, 1);
            ctx.beginPath();
            ctx.arc(0, 0, 1.5, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fillStyle = 'gray';
            ctx.fill();
        }

        this.drawFin = function(x1, y1) {
            var ctx = this.ctx;
            ctx.translate(x1 + 16, y1 + 5);
            ctx.rotate(-Math.PI / 6);
            ctx.scale(1.5, 1);
            ctx.beginPath();
            ctx.arc(0, 0, 4, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
        }
    }

    Koi.prototype.initEmitter = function(Emitter) {
        bubbles = new Emitter();
        bubbles.createParticles(this.endpoint);
    };

    Koi.prototype.drawShadow = function() {
        var ctx = this.ctx,
            color = 'gray';

        ctx.save()
        ctx.translate(this.x + 40, this.y + 60);
        ctx.rotate(this.direction);
        ctx.globalAlpha = 0.15;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        this.drawKoi(color);
        ctx.restore();
    };

    Koi.prototype.draw = function(Emitter) {
        var ctx = this.ctx;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.direction);
        if (getMagnitude(this.velocity) > 2) {
            ctx.save();
            ctx.translate(40, 0);
            bubbles.updateAndDraw(ctx, this.endpoint);
            ctx.restore();
        }
        this.drawKoi(this.color);
        ctx.restore();
    };

    Koi.prototype.move = function(dt, target) {
        var force = this.seekPosition(target.x, target.y);
        this.acceleration.x = force.x / this.mass;
        this.acceleration.y = force.y / this.mass;

        
        this.velocity.x += this.acceleration.x * dt;
        this.velocity.y += this.acceleration.y * dt;
        this.velocity.x = Math.min(this.velocity.x, MAX_SPEED);
        this.velocity.y = Math.min(this.velocity.y, MAX_SPEED);

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.direction = Math.atan2(this.velocity.y, this.velocity.x);

        // move tail
        this.endpoint.y = TAIL_DELTA * Math.sin(getMagnitude(this.acceleration) * 50);
        this.endpoint.x = -Math.sqrt(tailDistance - Math.pow(this.endpoint.y, 2));

        this.acceleration.x = 0;
        this.acceleration.y = 0;
    };

    return Koi;
}();