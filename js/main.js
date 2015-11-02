"use strict";

/**
 * If app exists use the existing copy
 * else create a new object literal
 */
var app = app || {};

app.main = {
    canvas: undefined,
    ctx: undefined,
    welcome: undefined,
    koi: undefined,
    sakura: undefined,
    lastTime: 0,
    animationId: 0,
    images: undefined,
    imagesLoaded: false,
    paused: false,
    sound: undefined,
    myKeys: undefined,
    mouseDown: false,
    count: 0,
    Emitter: undefined,

    init: function() {
        var that = this,
            resetButton = document.querySelector('#resetIcon'),
            questionButton = document.querySelector('#questionIcon');

        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.welcome = document.querySelector('.welcome');

        this.welcome.onclick = function() {
            that.hideWelcome();
        };

        this.koi.init(this.Emitter);
        this.sakura.init();

        resetButton.onclick = function(e) {
            e.preventDefault();
            that.sakura.clearSakura();
        }

        questionButton.onclick = function() {
            that.showWelcome();
        }

        this.canvas.onmousedown = this.handleMouseDown.bind(this);
        this.canvas.onmousemove = this.handleMouseMove.bind(this);
        this.canvas.onmouseup = this.handleMouseUp.bind(this);

        this.update();
    },

    update: function() {
        var dt = this.calculateDeltaTime();

        this.animationId = requestAnimationFrame(this.update.bind(this));

        if (this.paused) {
            this.drawPauseScreen();
            return;
        }

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.koi.moveKoi(dt);
        this.sakura.moveSakura(dt);

        // clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draw new elements
        this.sakura.drawShadow();
        this.koi.drawShadow();

        this.koi.drawKoi();
        this.sakura.drawSakura();
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

    pauseGame: function() {
        this.paused = true;
        cancelAnimationFrame(this.animationId);
        this.update();
        this.sound.stopBGAudio();
    },

    resumeGame: function() {
        cancelAnimationFrame(this.animationId);
        this.paused = false;
        this.update();
        this.sound.playBGAudio();
    },

    drawPauseScreen: function() {
        var ctx = this.ctx;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '40pt Dosis';
        ctx.fillStyle = 'white';
        ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2);
        ctx.restore();        
    },

    handleMouseDown: function(e) {
        this.mouseDown = true;
        this.hideWelcome();
    },

    handleMouseMove: function(e) {
        var mouse = getMouse(e),
            randomNumber = Math.floor(getRandom(0, 10));

        this.count += 1;
        if (this.mouseDown &&
            this.myKeys.keydown[this.myKeys.KEYBOARD.KEY_SHIFT] &&
            this.count % 10 === randomNumber) {
            this.sakura.makeSakura(mouse.x, mouse.y);
        }
    },

    handleMouseUp: function() {
        this.mouseDown = false;
    },

    hideWelcome: function() {
        this.welcome.className += ' is-hidden';
    },

    showWelcome: function() {
        this.welcome.className = 'welcome';
    },
};
