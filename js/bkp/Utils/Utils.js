/// <reference path="../Main.js" />

var Utils = {

    getAngle: function (obj1, obj2) {
        var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x) * 180 / Math.PI;
        if (angle < 0) angle += 360;
        return angle;
    },

    distance: function (obj1, obj2) {
        return Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2));
    },

    toRadians: function (angle) {
        return angle * Math.PI / 180;
    },

    toDegrees: function (angle) {
        return angle * 180 / Math.PI;
    },

    random: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    reflectAngle: function (angle, isYAxis) {
        if (isYAxis) {
            return 360 - angle;
        } else {
            angle = 180 - angle;
            return angle > 0 ? angle : angle + 360;
        }
    },

    fromPolar: function (r, a, p) {
        var point = new Point(r * Math.cos(Utils.toRadians(a)), r * Math.sin(Utils.toRadians(a)));
        if (!p) return point;
        point.x += p.x;
        point.y += p.y;
        return point;
    },
    
    copyPoints: function(from) {

        var to = [];
        for (var i = 0; i < from.length; i++) {
            if (from[i].hasOwnProperty("x") && from[i].hasOwnProperty("y")) {
                to[i] = new Point(from[i].x, from[i].y);
            }
        }

        return to;

    },

    isEmptyObject: function (obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }
        return true;
    },

    limitLoop: function (fn, fps) {

        var then = new Date().getTime();

        // custom fps, otherwise fallback to 60
        fps = fps || 60;
        var interval = 1000 / fps;

        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        return (function loop(time) {
            requestAnimationFrame(loop);

            var now = new Date().getTime();
            var delta = now - then;

            if (delta > interval) {
                // Update time
                // now - (delta % interval) is an improvement over just 
                // using then = now, which can end up lowering overall fps
                then = now - (delta % interval);

                // call the fn
                fn();
            }
        }(0));
    }

}

Array.prototype.contains = function (item) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == item) {
            return true;
        }
    }
    return false;
}

Array.prototype.remove = function (item) {
    if (this.contains(item)) {
        this.splice(this.indexOf(item), 1);
        return true;
    } else {
        return false;
    }
}

Array.prototype.each = function (func) {
    for (var i = 0; i < this.length; i++) func.call(this[i], i);
}


function Delay(frames) {
    this.max = frames;
    this.current = 0;
    this.tick = function () {
        if (this.current > 0) {
            this.current--;
        }
    };
    this.reset = function () {
        this.current = this.max;
    };
    this.check = function () {
        if (this.current === 0) return true;
        return false;
    };
    this.tickAndCheck = function () {
        this.tick();
        if (this.check()) {
            this.reset();
            return true;
        }
        return false;
    };
}

var Log = {
    lines: [],
    addLine: function(object, property, propertyDisplayName, toFixed) {
        var log = document.getElementById("log");
        var label = document.createElement("label");
        label.innerText = propertyDisplayName || property;
        var span = document.createElement("span");
        log.appendChild(label);
        log.appendChild(span);
        var properties = property.split(".");
        this.lines.push({
            label: label,
            object: object,
            setText: function() {
                var obj = this.object;
                for (var i = 0; i < properties.length - 1; i++) {
                    obj = obj[properties[i]];
                };
                var text = obj[properties[properties.length - 1]];
                if (typeof text == "number" && toFixed) text = text.toFixed(5);
                span.innerText = text;
            }
        });
    },
    update: function () {
        for (var i = 0; i < this.lines.length; i++) {
            this.lines[i].setText();
        }
    }
};
