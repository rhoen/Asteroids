;(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }


  var Planet =  Asteroids.Planet = function (args) {
    this.originPos = args.originPos;
    this.relativePos = [0,0];
    this.background = args.background;
    this.setDefaults(args);
    this.angle = args.angle;
    this.pos = args.pos;
    Asteroids.MovingObject.call(this, args);
  }

  //these defaults are used for the game background
  Planet.DEFAULTS = {
    speedChange: 0,
    radiusMultiplier: 1,
    radiusAdder: 0,
    speed: 1,
    color: '#FFE0EF',
    radius: 1,
  };

  Asteroids.Util.inherits(Planet, Asteroids.MovingObject);

  Planet.prototype.setDefaults = function(args) {
    var set = args.settings;
    var def = Planet.DEFAULTS;
    this.speedChange = set.speedChange || def.speedChange;
    this.radiusMultiplier = set.radiusMultiplier || def.radiusMultiplier;
    this.radiusAdder = set.radiusAdder || def.radiusAdder;
    this.speed = set.speed || def.speed;
    this.color = set.color || def.color;
    this.radius = set.radius || def.radius;
  };

  Planet.prototype.decay = function () {
    if (this.background.isGameBackground) {
      if (this.pos[0] >= this.game.dimX + this.radius * 2) {
        this.remove();
      } else if (this.pos[0] <= 0 - this.radius * 2) {
        this.remove();
      } else if (this.pos[1] >= this.game.dimY + this.radius * 2) {
        this.remove();
      } else if (this.pos[1] <= 0 - this.radius * 2) {
        this.remove();
      }
    } else {
      if (Math.hypot(this.relativePos[0], this.relativePos[1]) >
      this.background.asteroid.radius) {
        this.remove();
      }
    }

  };

  Planet.prototype.remove = function () {
    this.background.removePlanet(this);
  };

  Planet.prototype.move = function (delta) {
    this.speed += this.speedChange;
    this.radius *= this.radiusMultiplier;
    this.radius += this.radiusAdder;
    this.vel = Asteroids.Util.vel(this.angle, this.speed);
    this.relativePos = [
      this.relativePos[0] + this.vel[0],
      this.relativePos[1] + this.vel[1],
    ];
    this.pos = [
      this.background.pos[0] + this.relativePos[0],
      this.background.pos[1] + this.relativePos[1],
    ];
  };


})();
