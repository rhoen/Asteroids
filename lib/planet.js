;(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }


  var Planet =  Asteroids.Planet = function (args) {
    args.color = Planet.COLOR;
    args.radius = Planet.RADIUS;
    args.speed = Planet.SPEED;
    this.originPos = args.originPos;
    this.relativePos = [0,0];
    this.background = args.background;
    this.setDefaults(args);
    Asteroids.MovingObject.call(this, args);
  }

  //these defaults are used for the game background
  Planet.DEFAULTS = {
    speedChange: .15,
    radiusMultiplier: 1.01,
    radiusAdder: .1,
  };
  Planet.SPEED = 1;
  Planet.COLOR = '#FFE0EF';
  Planet.RADIUS = 1;

  Asteroids.Util.inherits(Planet, Asteroids.MovingObject);

  Planet.prototype.setDefaults = function(args) {
    if (!args.settings) {
      this.speedChange = Planet.DEFAULTS.speedChange;
      this.radiusMultiplier = Planet.DEFAULTS.radiusMultiplier;
      this.radiusAdder = Planet.DEFAULTS.radiusAdder;
    } else {
      this.speedChange = args.settings.speedChange;
      this.radiusMultiplier = args.settings.radiusMultiplier;
      this.radiusAdder = args.settings.radiusAdder;
    }
  };

  Planet.prototype.decay = function () {
    if (this.pos[0] >= this.game.dimX + this.radius * 2) {
      this.remove();
    } else if (this.pos[0] <= 0 - this.radius * 2) {
      this.remove();
    } else if (this.pos[1] >= this.game.dimY + this.radius * 2) {
      this.remove();
    } else if (this.pos[1] <= 0 - this.radius * 2) {
      this.remove();
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
    this.pos = [
      this.pos[0] + this.vel[0] + this.background.vel[0],
      this.pos[1] + this.vel[1] + this.background.vel[1]
    ];
  };


})();
