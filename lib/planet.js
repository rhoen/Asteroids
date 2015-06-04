;(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }


  var Planet =  Asteroids.Planet = function (args) {
    args.color = Planet.COLOR;
    args.radius = Planet.RADIUS;
    args.speed = Planet.SPEED;
    this.background = args.background;
    Asteroids.MovingObject.call(this, args);
  }

  Planet.SPEED = 1;
  Planet.COLOR = 'black';
  Planet.RADIUS = 1;

  Asteroids.Util.inherits(Planet, Asteroids.MovingObject);

  Planet.prototype.decay = function () {
    if (this.pos[0] >= this.game.dimX) {
      this.remove();
    } else if (this.pos[0] <= 0) {
      this.remove();
    } else if (this.pos[1] >= this.game.dimY) {
      this.remove();
    } else if (this.pos[1] <= 0) {
      this.remove();
    }
  };

  Planet.prototype.remove = function () {
    this.background.removePlanet(this);
  };

  Planet.prototype.move = function () {
    this.speed += .15;
    this.radius += .1;
    this.vel = Asteroids.Util.vel(this.angle, this.speed);
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
    this.game.wrap(this.pos);
  };


})();
