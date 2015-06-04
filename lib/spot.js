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
    Asteroids.MovingObject.call(this, args);
  }

  Planet.SPEED = 1;
  Planet.COLOR = '#FFE0EF';
  Planet.RADIUS = 1;

  Asteroids.Util.inherits(Planet, Asteroids.MovingObject);

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
    this.speed += .15;
    this.radius *= 1.01;
    this.radius += .1;
    this.vel = Asteroids.Util.vel(this.angle, this.speed);
    this.pos = [
      this.pos[0] + this.vel[0] + this.background.vel[0],
      this.pos[1] + this.vel[1] + this.background.vel[1]
    ];
  };


})();
