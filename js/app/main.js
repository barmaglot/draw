define(function(require) {
    console.log("%capp started", "color: #aaa");
    
    // Dependencies
    var canvas = require('canvas');
    var Brush = require('instruments/brush');
    var Utils = require('utils/util');
    var Point = require('geometry/point');

    // Private
    var showFPS = true;
    // var current = null;
    // var mouse = this.mouse = { x: 0, y: 0, isDown: false };
    // var rays = 18;
    // var grid = grid(rays);
    // var brushes = [];

    function init() {

        canvas.
        

        // document.querySelector("#exitFullScreen").addEventListener("click", toggleFullScreen);
        // document.querySelector("#exitFullScreen").addEventListener("touchend", toggleFullScreen);

        // initEvents();
        // fps.init();
        // Utils.limitLoop(update, 60);

        // var brush = new Brush(3);
        // current = brush;
        // for (var i = 0; i < rays; i++) {
        //     brushes.push(new Brush(3));
        // }
    }

    // function update() {
    //     fps.update();
        
    //     // if (mouse.isDown) {
    //     //     _.each(grid, function(i) {
    //     //         var segment = 360 / grid.length;
    //     //         var a = Utils.getAngle(mouse, canvas.center);
    //     //         var r = Utils.distance(mouse, canvas.center);
    //     //         if (i % 2) {
    //     //             var p = point = Utils.fromPolar(r, a + segment * i, canvas.center);
    //     //             brushes[i].draw(p.x, p.y);
    //     //         } else {
    //     //             var p = point = Utils.fromPolar(r, segment * i - a, canvas.center);
    //     //             brushes[i].draw(p.x, p.y);
    //     //         }
                
    //     //     });
    //     // }
    // }

    function initEvents() {
        // canvas.canvas.addEventListener("mousedown", canvasMouseDown, false);
        // canvas.canvas.addEventListener("mousemove", canvasMouseMove, false);
        // canvas.canvas.addEventListener("mouseup", canvasMouseUp, false);

        // canvas.canvas.addEventListener("touchstart", canvasMouseDown, false);
        // canvas.canvas.addEventListener("touchmove", canvasMouseMove, false);
        // canvas.canvas.addEventListener("touchend", canvasMouseUp, false);
    }

    // function canvasMouseDown(e) {
    //     mouse.isDown = true;
	//     mouse.x = e.clientX;
	//     mouse.y = e.clientY;
	// }

    // function canvasMouseMove(e) {
    //     mouse.x = e.clientX;
	//     mouse.y = e.clientY;
    // }

    // function canvasMouseUp(e) {
    //     mouse.isDown = false;
    //     _.each(brushes, function(brush) {
    //         brush.lastPoint = null;
    //     });
    // }

    var fps = {
        current: 0,
        now: 0,
        lastUpdate: (new Date) * 1 - 1,
        filter: 50,
        init: function() {
            if (showFPS) {
                var fpsOut = document.getElementById("fps");
                setInterval(function () {
                    fpsOut.innerHTML = this.current.toFixed(1) + "fps";
                }.bind(this), 100);
            }
        },
        update: function() {
            var thisFrameFPS = 1000 / (((this.now = new Date) - this.lastUpdate) || 1);
            this.current += (thisFrameFPS - this.current) / this.filter;
            this.lastUpdate = this.now;
        }
    };


    // function grid(count) {
    //     var segments = [];
    //     var segment = 360 / count;
    //     var point;
    //     for (var i = 0; i < count; i++) {
    //         point = Utils.fromPolar(1000, segment * i, canvas.center);
    //         segments.push(i);
    //         canvas.drawLine(canvas.center, point, 1, 'rgba(0,0,0,0.2)');
    //     }
    //     return segments;
    // } 


    // function toggleFullScreen() {
    //     if (!document.fullscreenElement &&    // alternative standard method
    //         !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    //         if (document.documentElement.requestFullscreen) {
    //         document.documentElement.requestFullscreen();
    //         } else if (document.documentElement.mozRequestFullScreen) {
    //         document.documentElement.mozRequestFullScreen();
    //         } else if (document.documentElement.webkitRequestFullscreen) {
    //         document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    //         }
    //     } else {
    //         if (document.cancelFullScreen) {
    //         document.cancelFullScreen();
    //         } else if (document.mozCancelFullScreen) {
    //         document.mozCancelFullScreen();
    //         } else if (document.webkitCancelFullScreen) {
    //         document.webkitCancelFullScreen();
    //         }
    //     }
    // }

    // Start app
    init();

});