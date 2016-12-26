define(function(require, exports, module) {

    // Dependencies
    var Point = require('geometry/point');

    var Polygon = new Class({

        points: [],
        sides: [],
        isClosed: false,

        initialize: function(points, isClosed) {
    
            if (!_.isArray(points)) {
                console.warn("Invalid points for Polygon");
                return;
            }

            this.points = points;
            this.isClosed = !!isClosed;

            this.setSides();
        },

        setSides: function () {

            this.sides = [];
            for (var i = 1; i < this.points.length; i++) {
                this.sides.push(new Line(this.points[i - 1], this.points[i]));
            }
            // Close path
            if (this.isClosed) {
                this.sides.push(new Line(this.points[this.points.length - 1], this.points[0]));
            }
        },

        draw: function(canvas, color, size) {
            _.each(this.sides, function(side) {
                canvas.drawLine(side.p1, side.p2, color, size);
            });
        }
        
    });

    module.exports = Polygon;

});