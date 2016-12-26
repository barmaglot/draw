function Shape(x, y, polygons) {
    if (!x && !y && !polygons) return;
    if (x instanceof Array) {
        this.polygons = x;
    } else {
        this.polygons = polygons;   
    }
    this.center = new Point(x, y);
    this.angle = 0;
    this.width = 0;
    this.height = 0;
    this.objsCenters = [];

    var minX = this.polygons[0].x;
    var minY = this.polygons[0].y;
    var maxX = this.polygons[0].x;
    var maxY = this.polygons[0].y;
    var i;
    for (i = 0; i < this.polygons.length; i++) {
        if (minX > this.polygons[i].x - this.polygons[i].width / 2) minX = this.polygons[i].x - this.polygons[i].width / 2;
        if (maxX < this.polygons[i].x + this.polygons[i].width / 2) maxX = this.polygons[i].x + this.polygons[i].width / 2;
        if (minY > this.polygons[i].y - this.polygons[i].height / 2) minY = this.polygons[i].y - this.polygons[i].height / 2;
        if (maxY < this.polygons[i].y + this.polygons[i].height / 2) maxY = this.polygons[i].y + this.polygons[i].height / 2;
    }
    this.width = maxX - minX;
    this.height = maxY - minY;
    for (i = 0; i < this.polygons.length; i++) {
        this.objsCenters[i] = new Point(this.polygons[i].x, this.polygons[i].y);
    }

}

Shape.prototype.move = function (x, y, angle) {

    if (this.x == x && this.y == y && this.angle == angle) return;

    this.center.x = x;
    this.center.y = y;

    for (var i = 0; i < this.polygons.length; i++) {
        this.polygons[i].setPosition(this.objsCenters[i].x + x, this.objsCenters[i].y + y);
        this.polygons[i].setAngle(angle, x, y);
    }
    this.angle = angle;

};

Shape.prototype.isInterceptShape = function (shape) {

    var intersect = {
        points: [],
        sides: []
    };

    for (var j = 0; j < this.polygons.length; j++) {
        for (var k = 0; k < shape.polygons.length; k++) {
            var p = this.polygons[j].isIntersect(shape.polygons[k]);
            if (p) {
                intersect.points = intersect.points.concat(p.points);
                intersect.sides = intersect.sides.concat(p.sides);
            }
        }
    }

    if (intersect.points.length != 0) {
        return intersect;
    } else {
        return false;
    }

};

Shape.prototype.isIntersectLine = function (l) {

    var points = [];
    for (var i = 0; i < this.polygons.length; i++) {
        for (var j = 0; j < this.polygons[i].sides.length; j++) {
            var p = this.polygons[i].sides[j].getInterceptPoint(l);
            if (p) {
                points.push(p);
                //this.polygons[i].sides[j].draw();
            }
        };
    };
    if (points.length) {
        //l.draw();
        return points;
    } else {
        return false;
    }
}

Shape.prototype.eachPoint = function (fn) {
    for (var i = 0; i < this.polygons.length; i++) {
        for (var j = 0; j < this.polygons[i].points.length; j++) {
            if (fn.call(this.polygons[i].points[j], (i + 1) * (j + 1) - 1)) return;
        };
    };
}

Shape.prototype.getRadius = function () {
    return Math.sqrt(this.width * this.width + this.height * this.height) / 2;
}

Shape.prototype.update = function () {

    var minX = this.polygons[0].x;
    var minY = this.polygons[0].y;
    var maxX = this.polygons[0].x;
    var maxY = this.polygons[0].y;
    for (var i = 0; i < this.polygons.length; i++) {
        if (minX > this.polygons[i].x - this.polygons[i].width / 2) minX = this.polygons[i].x - this.polygons[i].width / 2;
        if (maxX < this.polygons[i].x + this.polygons[i].width / 2) maxX = this.polygons[i].x + this.polygons[i].width / 2;
        if (minY > this.polygons[i].y - this.polygons[i].height / 2) minY = this.polygons[i].y - this.polygons[i].height / 2;
        if (maxY < this.polygons[i].y + this.polygons[i].height / 2) maxY = this.polygons[i].y + this.polygons[i].height / 2;
    }
    this.width = maxX - minX;
    this.height = maxY - minY;
    for (var i = 0; i < this.polygons.length; i++) {
        this.objsCenters[i] = new Point(this.polygons[i].x, this.polygons[i].y);
    }

}

// ------- DRAW --------
Shape.prototype.draw = function (stroke, fill) {

    for (var j = 0; j < this.polygons.length; j++) {
        this.polygons[j].draw(stroke, fill);
    }

    //this.center.draw();

}