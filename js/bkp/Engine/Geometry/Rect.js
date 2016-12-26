function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width || 100;
    this.height = height || 50;
    this.points = [];
    this.sides = [];
    this.isClosed = true;

    this.points = [
            new Point(x - this.width / 2, y - this.height / 2),
            new Point(x + this.width / 2, y - this.height / 2),
            new Point(x + this.width / 2, y + this.height / 2),
            new Point(x - this.width / 2, y + this.height / 2)
        ];

    this.sides = [
            new Line(this.points[0], this.points[1]),
            new Line(this.points[1], this.points[2]),
            new Line(this.points[2], this.points[3]),
            new Line(this.points[3], this.points[0])
        ];

    this.base = Utils.copyPoints(this.points);
}

Rect.prototype = new Polygon();

Rect.prototype.draw = function (stroke, fill) {

    context.beginPath();

    context.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
    for (var i = 0; i < this.points.length; i++) {
        context.lineTo(this.points[i].x, this.points[i].y);
    }
    context.strokeStyle = stroke || "#00f";
    context.fillStyle = fill || "transparent";
    context.stroke();
    context.fill();

}