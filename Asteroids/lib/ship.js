;(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (args) {
    args.color = Ship.COLOR;
    args.radius = Ship.RADIUS;
    args.vel = [0,0];
    args.speed = 0;
    args.angle = -Math.PI / 2;
    args.pos = [Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2];
    Asteroids.MovingObject.call(this, args);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 30;
  Ship.COLOR = "#000aaa";
  Ship.MAXSPEED = 15;
  Ship.MINSPEED = -4;

  Ship.prototype.turn = function (impulse) {
    this.angle += impulse;
  };

  Ship.prototype.relocate = function () {
    var x = Math.random() * Asteroids.Game.DIM_X;
    var y = Math.random() * Asteroids.Game.DIM_Y;

    this.pos = [x,y];
  };

  Ship.prototype.power = function (impulse) {
    this.speed += impulse;
  };

  Ship.prototype.decay = function () {
    //called on every step.
    if (this.speed > Ship.MAXSPEED) {
      this.speed = Ship.MAXSPEED;
    }
    if (this.speed < Ship.MINSPEED) {
      this.speed = Ship.MINSPEED;
    }

    this.speed *= 0.95;
  };

  Ship.prototype.fireBullet = function () {
    var speed = (this.speed > 14) ? this.speed * 1.2 : 16;
    var pointX = this.pos[0] + Math.cos(this.angle) * this.radius;
    var pointY = this.pos[1] + Math.sin(this.angle) * this.radius;
    var bullet = new Asteroids.Bullet({
      // speed: speed,
      speed: speed,
      pos: [pointX, pointY],
      angle: this.angle,
      game: this.game
    });
    this.game.bullets.push(bullet);
  };

  Ship.prototype.draw = function (ctx) {
    // ctx.fillStyle = this.color;

    var x = this.pos[0];
    var y = this.pos[1];
    var r = this.radius;
    var bottomAngle = (this.angle + 3 * Math.PI / 4);
    var topAngle = (this.angle - 3 * Math.PI / 4);
    var pointX = Math.cos(this.angle) * r;
    var pointY = Math.sin(this.angle) * r;
    var bottomPointX = Math.cos(bottomAngle) * r;
    var bottomPointY = Math.sin(bottomAngle) * r;
    var topPointX = Math.cos(this.angle - 3 * Math.PI / 4) * r;
    var topPointY = Math.sin(this.angle - 3 * Math.PI / 4) * r;
    var innerPointX = Math.cos(this.angle) * -0.2 * r;
    var innerPointY = Math.sin(this.angle) * -0.2 * r;
    if (this.engineOn) {
      ctx.beginPath();
      ctx.arc(
        x,
        y,
        r,
        bottomAngle,
        topAngle
      );
      ctx.lineTo(x, y);
      ctx.lineTo(x + bottomPointX, y + bottomPointY);
      ctx.fillStyle = "red";
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(x + pointX, y  + pointY);
    ctx.lineTo(x + bottomPointX, y + bottomPointY);
    ctx.lineTo(x + innerPointX, y + innerPointY);
    ctx.lineTo(x + topPointX, y + topPointY);
    ctx.lineTo(x + pointX, y + pointY);
    ctx.stroke();

  };

})();
