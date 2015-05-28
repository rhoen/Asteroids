;(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (args) {
    this.pos = args.pos;
    this.vel = args.vel;
    this.radius = args.radius;
    this.color = args.color;
    this.game = args.game;
    this.angle = args.angle;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
    this.game.wrap(this.pos);
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var x1, y1, x2, y2;
    x1 = this.pos[0];
    y1 = this.pos[1];
    x2 = otherObject.pos[0];
    y2 = otherObject.pos[1];

    var dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    var radSum = this.radius + otherObject.radius;
    var isCollidedWith = false;

    if (dist < radSum) {
      isCollidedWith = true;
    }

    return isCollidedWith;
  };
})();
