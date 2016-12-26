function Object2D(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.angle = 0;

    this.shape = new Shape();

    this.strokeStyle = "#000";
    this.fillStyle = "transparent";
}

Object2D.prototype.update = function (stage) {
    this.move(stage);
    this.collision(stage);
    this.state(stage);
};

Object2D.prototype.draw = function () {
    this.shape.draw(this.strokeStyle, this.fillStyle);
};

Object2D.prototype.translate = function (distance, angle) {
    this.x += distance * Math.cos(Utils.toRadians(angle));
    this.y += distance * Math.sin(Utils.toRadians(angle));
};

Object2D.prototype.move = function (stage) {
    this.shape.move(this.x, this.y, this.angle);
};

Object2D.prototype.rotate = function (angle) {

    this.angle += angle || 0;
    if (this.angle < 0) this.angle += 360;
    if (this.angle > 360) this.angle -= 360;

};

Object2D.prototype.collision = function (stage) { };

Object2D.prototype.state = function (stage) { };