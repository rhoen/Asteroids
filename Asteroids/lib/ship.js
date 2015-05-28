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

  Ship.RADIUS = 10;
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

  Ship.prototype.move = function () {
    // console.log("ship pos: ", this.pos)
    // console.log("ship vel: ", this.vel);
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.game.wrap(this.pos);
  };
  Ship.prototype.fireBullet = function () {
    console.log("bullet fired");
    var newVel = [(this.vel[0] * 1.5), (this.vel[1] * 1.5)];

    var pos = this.pos.slice(0);

    if (newVel == [0, 0]) {
      newVel = [0, -1];
    }

    var bullet = new Asteroids.Bullet({
      vel: newVel,
      pos: pos,
      game: this.game
    });
    this.game.bullets.push(bullet);
    debugger
  };

})();
