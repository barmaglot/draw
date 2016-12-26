define(function(require, exports, module) {

    // Dependencies
    var canvas = require('canvas');
    var Polygon = require('geometry/polygon');

    var RectangularPattern = new Class({

        grid: null,
        width: 200,
        height: 100,

        initialize: function(width, height) {
            this.setRays(width, height);
        },

        calcGrid: function(width, height) {
            var cells = [];
            var countW = Math.round(canvas.width / width);
            var countH = Math.round(canvas.height / height);
            for (var h = 0; h < countH; h++)
                for (var w = 0; w < countW; w++)
                    cells.push(createPoly(w * width, h * height, width, height));

            function createPoly(x, y, h, w) {
                points = [
                    new Point(x - w / 2, y - h / 2),
                    new Point(x + w / 2, y - h / 2),
                    new Point(x + w / 2, y + h / 2),
                    new Point(x - w / 2, y + h / 2)
                ];
                return new Polygon(points);
            }

            return cells;
        },

        setRays: function(w, h) {
            this.width = w || this.width;
            this.height = h || this.height;
            this.grid = this.calcGrid(this.width, this.height);
        },

        draw: function () {
            
        },

        drawGrid: function() {
            _.each(this.grid, function(cell) {
                canvas.drawGrid(cell);
            });
        }

    });

    module.exports = RectangularPattern;

});