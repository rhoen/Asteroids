;(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (args) {
    args.color = Ship.COLOR;
    args.radius = Ship.RADIUS;
    args.vel = [0,0];
    args.pos = [Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2];
    Asteroids.MovingObject.call(this, args);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 40;
  Ship.COLOR = "#000aaa";

  Ship.prototype.relocate = function () {
    var x = Math.random() * Asteroids.Game.DIM_X;
    var y = Math.random() * Asteroids.Game.DIM_Y;

    this.pos = [x,y];
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.decay = function () {
    //called on every step.
    this.vel = [this.vel[0] * 0.945, this.vel[1] * 0.95];
  };

  Ship.prototype.fireBullet = function () {
    var vel = [(this.vel[0] * 1.5), (this.vel[1] * 1.5)];
    // (vel[0] < 0) ? vel[0] -= 1.5 : vel[0] += 1.5;
    // (vel[1] > 0) ? vel[1] -= 1.5 : vel[1] += 1.5;
    console.log("ship vel: ",this.vel);
    console.log("bullet vel: ", vel);

    var bullet = new Asteroids.Bullet({
      vel: vel,
      pos: this.pos.slice(0),
      game: this.game
    });
    this.game.bullets.push(bullet);
  };

  Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    var x = this.pos[0];
    var y = this.pos[1];
    var r = this.radius;
    var angle = Math.PI / 4;
    var pointX = Math.cos(angle) * r;
    var pointY = Math.sin(angle) * r;
    ctx.arc(
      x,
      y,
      r,
      0,
      2 * Math.PI
    );
    ctx.moveTo(x, y);
    ctx.lineTo(x + pointX, y  + pointY);
    ctx.stroke();
    // ctx.fill();
  };

})();
