;(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (args) {
    this.color = Asteroid.COLOR;
    this.size = args.size;
    this.radius = Asteroid.RADIISIZES[this.size];
    this.speed = Asteroids.Util.randSpeed();
    this.angle = Asteroids.Util.randAngle();
    this.pos = args.pos;
    this.vel = Asteroids.Util.vel(this.angle, this.speed);
    this.background = new Asteroids.Background({
      game: args.game,
      vel: this.vel,
      pos: this.pos,
      settings: Asteroid.BACKGROUNDSETTINGS,
      asteroid: this,
    })
    Asteroids.MovingObject.call(this, args);
  };
  Asteroid.COLOR = "rgba(10, 242, 255, 0)";
  Asteroid.STARTINGSIZE = 3;
  Asteroid.RADIISIZES = {
    3: 45,
    2: 25,
    1: 15,
    0: 0
  }

  Asteroid.BACKGROUNDSETTINGS = {
    maxFunc: function () {return 12},
    countChange: 7,
    modConstant: 50,
    planetSettings: {
      speedChange: 0,
      radiusMultiplier: 1,
      radiusAdder: .1,
      speed: .5,
      color: '#FFE0EF',
      radius: .1,
    },
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

  Asteroid.prototype.decay = function () {
    this.background.decay();
  };

  Asteroid.prototype.move = function () {
    this.vel = Asteroids.Util.vel(this.angle, this.speed);
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
    this.background.pos = this.pos;
    this.background.move();
    this.game.wrap(this.pos);
  };

  Asteroid.prototype.draw = function (ctx) {
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
    this.background.draw(ctx);
  };


})();
