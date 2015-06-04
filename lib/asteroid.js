;(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (args) {
    args.color = Asteroid.COLOR;
    this.size = args.size;
    args.radius = Asteroid.RADIISIZES[this.size];
    this.speed = Asteroids.Util.randSpeed();
    this.angle = Asteroids.Util.randAngle();
    this.pos = args.pos;
    this.vel = Asteroids.Util.vel(this.angle, this.speed);
    this.background = new Asteroids.Background({
      game: args.game,
      vel: this.vel,
      pos: this.pos
    })
    Asteroids.MovingObject.call(this, args);
  };
  Asteroid.COLOR = "#000";
  Asteroid.STARTINGSIZE = 3;
  Asteroid.RADIISIZES = {
    3: 45,
    2: 25,
    1: 15,
    0: 0
  }

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.spawnChildren = function () {
    if (this.size == 1) {
      return;
    }
    var newSize = this.size - 1;
    for (var i = 0; i < 3; i++) {
      this.game.asteroids.push(new Asteroids.Asteroid({
        size: newSize,
        pos: this.pos,
        game: this.game
      }));
    }
  };

  Asteroid.prototype.move = function () {
    this.vel = Asteroids.Util.vel(this.angle, this.speed);
    this.background.vel = this.vel;
    this.background.pos = this.pos;
    this.background.move();
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
    this.game.wrap(this.pos);
  };

  Asteroid.prototype.draw = function (ctx) {
    this.background.draw(ctx);
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


})();
