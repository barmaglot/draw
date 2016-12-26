function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.rotate = function (x0, y0, angle) {

    var x = this.x;
    var y = this.y;
    angle = Utils.toRadians(angle);
    
    this.x = x0 + (x - x0) * Math.cos(angle) - (y - y0) * Math.sin(angle);
    this.y = y0 + (x - x0) * Math.sin(angle) + (y - y0) * Math.cos(angle);

};

Point.prototype.isInRect = function (rect) {

    var t1 = false;
    var t2 = false;
    if (!rect.points[3]) {
        t1 = this.IsInTriangle(rect.points[0], rect.points[1], rect.points[2]);
    } else {
        t1 = this.IsInTriangle(rect.points[0], rect.points[1], rect.points[3]);
        t2 = this.IsInTriangle(rect.points[3], rect.points[2], rect.points[1]);
    }

    return t1 || t2;

};

Point.prototype.IsInTriangle = function(p1, p2, p3) {
    var a = (p1.x - this.x) * (p2.y - p1.y) - (p2.x - p1.x) * (p1.y - this.y);
    var b = (p2.x - this.x) * (p3.y - p2.y) - (p3.x - p2.x) * (p2.y - this.y);
    var c = (p3.x - this.x) * (p1.y - p3.y) - (p1.x - p3.x) * (p3.y - this.y);

    return (a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0);
}

Point.prototype.getProjection = function(p1, p2) {
    var fDenominator = (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
    if (fDenominator == 0) // p1 and p2 are the same
        return p1;

    var t = (this.x * (p2.x - p1.x) - (p2.x - p1.x) * p1.x + this.y * (p2.y - p1.y) - (p2.y - p1.y) * p1.y) / fDenominator;

    return new Point(p1.x + (p2.x - p1.x) * t, p1.y + (p2.y - p1.y) * t);
}

Point.prototype.fill = "rgba(255,0,255,0.5)";

// ------- DRAW --------
Point.prototype.draw = function () {

    context.save();
    context.beginPath();

    context.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    context.fillStyle = this.fill;
    
    context.fill();
    context.restore();

}