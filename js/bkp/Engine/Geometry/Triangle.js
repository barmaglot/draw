function Triangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.points = [];
    this.sides = [];

    this.points = [
            new Point(x - this.width / 2, y - this.height / 2),
            new Point(x + this.width / 2, y),
            new Point(x - this.width / 2, y + this.height / 2),
        ];

    this.sides = [
            new Line(this.points[0], this.points[1]),
            new Line(this.points[1], this.points[2]),
            new Line(this.points[2], this.points[0]),
        ];

    this.base = Utils.copyPoints(this.points);
}

Triangle.prototype = new Polygon();