define(function(require, exports, module) {

    // Dependencies
    var Point = require('geometry/point');

    var Events = function(selector) {
        this.el = document.querySelector(selector);
        return this;
    }

    Events.prototype.on = function(type, handler) {
        this.el.addEventHandler(this, handler, false);
        return this;
    }

    module.exports = Events;

});