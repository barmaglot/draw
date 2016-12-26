define(function(require, exports, module) {

    // Dependencies
    var canvas = require('canvas');
    var Polygon = require('geometry/polygon');

    var RadialPattern = new Class({

        grid: null,
        rays: 5,

        initialize: function(rays) {
            this.setRays(rays);
        },

        calcGrid: function(count) {
            var cells = [];
            var angle = 360 / count;
            var point, cell, prevPoint;
            for (var i = 0; i < count; i++) {
                point = Utils.fromPolar(canvas.diagonal, angle * i, canvas.center);
                prevPoint = Utils.fromPolar(canvas.diagonal, angle * i - 1, canvas.center);
                cell = new Polygon([prevPoint, canvas.center, point]);
                cells.push(cell);
            }
            return cells;
        },

        setRays: function(count) {
            this.rays = count || this.rays;
            this.grid = this.calcGrid(this.rays);
        },

        draw: function () {
            
        },

        drawGrid: function() {
            _.each(this.grid, function(cell) {
                canvas.drawGrid(cell);
            });
        }

    });

    module.exports = RadialPattern;

});