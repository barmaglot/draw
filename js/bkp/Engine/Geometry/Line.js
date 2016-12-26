function Line(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
}

Line.prototype.isIntersect = function (l) {

    var v1, v2, v3, v4;
    v1 = (l.p2.x - l.p1.x) * (this.p1.y - l.p1.y) - (l.p2.y - l.p1.y) * (this.p1.x - l.p1.x);
    v2 = (l.p2.x - l.p1.x) * (this.p2.y - l.p1.y) - (l.p2.y - l.p1.y) * (this.p2.x - l.p1.x);
    v3 = (this.p2.x - this.p1.x) * (l.p1.y - this.p1.y) - (this.p2.y - this.p1.y) * (l.p1.x - this.p1.x);
    v4 = (this.p2.x - this.p1.x) * (l.p2.y - this.p1.y) - (this.p2.y - this.p1.y) * (l.p2.x - this.p1.x);

    return (v1 * v2 < 0) && (v3 * v4 < 0);

};

Line.prototype.getInterceptPoint = function (l) {

    var p1 = this.p1;
    var p2 = this.p2;
    var p3 = l.p1;
    var p4 = l.p2;

    var d = ((p4.y - p3.y) * (p2.x - p1.x)) - ((p4.x - p3.x) * (p2.y - p1.y));
    var n1 = ((p4.x - p3.x) * (p1.y - p3.y)) - ((p4.y - p3.y) * (p1.x - p3.x));
    var n2 = ((p2.x - p1.x) * (p1.y - p3.y)) - ((p2.y - p1.y) * (p1.x - p3.x));

    if (d == 0.0) {
        if (n1 == 0.0 && n2 == 0.0) {
            return false;  //COINCIDENT;
        }
        return false; // PARALLEL;
    }

    var ua = n1 / d;
    var ub = n2 / d;

    if (ua >= 0.0 && ua <= 1.0 && ub >= 0.0 && ub <= 1.0) {
        x = p1.x + ua * (p2.x - p1.x);
        y = p1.y + ua * (p2.y - p1.y);
        return new Point(x, y);
    }

    return false;

};

Line.prototype.length = function (l) {

    return Utils.distance(this.p1, this.p2);

};

Line.prototype.distanceToPoint = function (p) {

    var h = p.getProjection(this.p1, this.p2);

    var l = this.length();
    var a = Utils.distance(h, this.p1);
    var b = Utils.distance(h, this.p2);

    if (l > a && l > b) return Utils.distance(p, h);

    a = Utils.distance(p, this.p1);
    b = Utils.distance(p, this.p2);

    return Math.min(a, b);

};

// ------- DRAW --------
Line.prototype.draw = function (color) {

    context.save();
    context.beginPath();

    context.moveTo(this.p1.x, this.p1.y);
    context.lineTo(this.p2.x, this.p2.y);
    context.strokeStyle = color || "rgba(0, 255, 255, 0.2)"; //#0ff
    context.lineWidth = 3;

    context.stroke();
    context.restore();

}