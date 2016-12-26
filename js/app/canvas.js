define(function(require, exports, module) {

    // Dependencies
    var Point = require('geometry/point');
    var Utils = require('utils/util');
    var Grid = require('grid');
    var RadialPattern = require('patterns/radial');
    var RectangularPattern = require('patterns/rectangular');
    
    // Private
    var canvas = document.querySelector("#canvas");
    var c = canvas.getContext("2d");
    var w = window.innerWidth;
    var h = window.innerHeight;
    var center = new Point(w / 2, h / 2);
    var patterns = {
            radial: new RadialPattern(config.RADIAL_RAYS_DEFAULT),
            rectangular: new RectangularPattern(config.RECT_WIDTH, config.RECT_HEIGHT)
        };

    // Initialize
    canvas.width = w;
    canvas.height = h;

    module.exports = {
        
        canvas: canvas,
        context: c,
        width: w,
        height: h,
        hcw: w / 2,
        hch: h / 2,
        center: center,
        diagonal: Utils.distance(center, { x: 0, y: 0 }),
        gridColor: "rgba(0,0,0,.2)",
        gridThicknes: 1,
        pattern: null,

        setPattern: function(name) {
            this.pattern = patterns[name];
        },

        drawCircle: function(x, y, d, color) {
            c.save();
            c.beginPath();

            c.arc(x, y, d / 2, 0, Math.PI * 2, false);
            c.fillStyle = color || '#000';
            
            c.fill();
            c.restore();
        },

        drawLine: function(p1, p2, size, color) {
            c.save();
            c.beginPath();

            c.moveTo(p1.x, p1.y);
            c.lineTo(p2.x, p2.y);
            c.strokeStyle = color || '#000';
            c.lineWidth = size  || 1;
            c.lineCap = 'round';
            c.shadowColor = "black";
            c.shadowBlur = 2;

            c.stroke();
            c.restore();
        },

        draw: function(obj, color, size) {
            obj.draw(canvas, color, size);
        },

        drawGrid: function(obj) {
            this.draw.apply(Grid, obj, this.gridColor, this.gridThicknes);
        },

        showGrid: function() {
            this.pattern.drawGrid();
        },

        hideGrid: function() {
            this.clear.apply(Grid);
        },

        clear: function() {
            c.clearRect(0, 0, canvas.width, canvas.height);
        }

    };

});