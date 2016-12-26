function Polygon(points, isClosed) {
    
    if (!points) return;

    this.points = points;
    this.base = Utils.copyPoints(this.points);
    this.sides = [];
    this.isClosed = !!isClosed;

    // Finding polygon center
    var minX = 0;
    var maxX = 0;
    var minY = 0;
    var maxY = 0;
    for (var i = 0; i < this.points.length; i++) {
        if (minX > this.points[i].x) minX = this.points[i].x;
        if (maxX < this.points[i].x) maxX = this.points[i].x;
        if (minY > this.points[i].y) minY = this.points[i].y;
        if (maxY < this.points[i].y) maxY = this.points[i].y;
    }
    this.width = maxX - minX;
    this.height = maxY - minY;
    this.x = minX + this.width / 2;
    this.y = minY + this.height / 2;
    
    this.setSides();
}

Polygon.prototype.setSides = function () {

    this.sides = [];
    for (var i = 1; i < this.points.length; i++) {
        this.sides.push(new Line(this.points[i - 1], this.points[i]));
    }
    // Close path
    if (this.isClosed) {
        this.sides.push(new Line(this.points[this.points.length - 1], this.points[0]));
    }
}

Polygon.prototype.setAngle = function (angle, x, y) {
    if (angle == 0) return;
    var x0 = x || this.x;
    var y0 = y || this.y;
    for (var i = 0; i < this.points.length; i++) {
        this.points[i].rotate(x0, y0, angle);
    }
    this.setSides();
};

Polygon.prototype.setPosition = function (x, y) {
    var deltaX = x - this.x;
    var deltaY = y - this.y;
    this.x = x;
    this.y = y;
    this.points = Utils.copyPoints(this.base);
    for (var i = 0; i < this.points.length; i++) {
        this.points[i].x += x;
        this.points[i].y += y;
    }
    this.setSides();
};

Polygon.prototype.move = function (angle, x, y) {
    this.setPosition(x, y);
    this.setAngle(angle, x, y);
}

Polygon.prototype.isIntersect = function (poly) {

    var intersect = {
        points: [],
        sides: []
    };

    for (var j = 0; j < this.sides.length; j++) {
        for (var k = 0; k < poly.sides.length; k++) {
            var p = this.sides[j].getInterceptPoint(poly.sides[k]);
            if (p) {
                if (!intersect.points.contains(p)) intersect.points.push(p);
                if (!intersect.sides.contains(this.sides[j])) intersect.sides.push(this.sides[j]);
            }
        }
    }

    if (intersect.points.length != 0) {
        return intersect;
    } else {
        return false;
    }

}


// ------- DRAW --------
Polygon.prototype.draw = function (stroke, fill) {

    context.beginPath();

    context.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
    for (var i = 0; i < this.points.length; i++) {
        context.lineTo(this.points[i].x, this.points[i].y);
    }

    context.strokeStyle = stroke || "#ccc";
    context.fillStyle = fill || "transparent";
    context.stroke();
    context.fill();

    // var p = new Point(this.x, this.y);
    // p.draw();

};

