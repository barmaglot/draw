define(function(require, exports, module) {

    var Point = new Class({
        initialize: function(x, y) {
            this.x = x;
            this.y = y;
        }
    });

    module.exports = Point;

});