define(function(require, exports, module) {

    // Dependencies
    var Point = require('geometry/point');

    var Line = new Class({
        initialize: function(p1, p2, x2, y2) {
            if (p1 instanceof Point) {
                this.p1 = p1;
                this.p2 = p2;
            } else if (p1 instanceof Number && x2 && y2) {
                this.p1 = new Point(p1, p2);
                this.p2 = new Point(x2, y2);
            } else {
                throw Error("Invalid arguments for Line");
            }
        },
        draw: function(canvas, color, size) {
            canvas.drawLine(this.p1, this.p2, color, size);
        }
    });

    module.exports = Line;

});