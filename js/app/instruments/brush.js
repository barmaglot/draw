define(function(require, exports, module) {
    
    // Dependencies
    var Instrument = require('instruments/instrument');
    var canvas = require('canvas');
    var Point = require('geometry/point');
    var Utils = require('utils/util');
    
    // Private
    var maxSize = 1.5;
    var minSize = 1;
    var origSize = 1;

    // Class
    var Brush = new Class(Instrument, {

        color: 'rgba(0,0,0,1)',
        size: 1,
        lastPoint: null,
        newPoint: null,

        initialize: function(size) {
            this.size = size;
            origSize = size;
            maxSize = size * maxSize;
            minSize = size;
        },

        draw: function(x, y) {
            this.newPoint = new Point(x, y);
            if (!this.lastPoint) {
                this.size = origSize;
                this.lastPoint = this.newPoint;
            }
            // // pressure
            // if (Utils.distance(this.lastPoint, this.newPoint) < 2) {
            //     this.size = this.size < maxSize ? this.size * 1.1 : maxSize;
            // } else {
            //     this.size = this.size > minSize ? this.size / 1.1 : minSize;
            // }
            canvas.drawLine(this.lastPoint, this.newPoint, this.size, this.color);
            this.lastPoint = this.newPoint;
            // canvas.drawCircle(x, y, this.size, this.color);
        }

    });

    module.exports = Brush;
    
});