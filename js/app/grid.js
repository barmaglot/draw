define(function(require, exports, module) {

    // Dependencies
    var Point = require('geometry/point');
    var Utils = require('utils/util');
    
    // Private
    var canvas = document.querySelector("#grid");
    var c = canvas.getContext("2d");
    var w = window.innerWidth;
    var h = window.innerHeight;
    var center = new Point(w / 2, h / 2);

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
        diagonal: Utils.distance(center, { x: 0, y: 0 })

    };

});