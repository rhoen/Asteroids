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

  Planet.SPEED = 5;
  Planet.COLOR = 'black';
  Planet.RADIUS = 1;

  Asteroids.Util.inherits(Planet, Asteroids.MovingObject);

  Planet.prototype.decay = function () {
    if (this.pos[0] >= this.game.dimX + 10) {
      this.remove();
    } else if (this.pos[0] <= -10) {
      this.remove();
    } else if (this.pos[1] >= this.game.dimY + 10) {
      this.remove();
    } else if (this.pos[1] <= -10) {
      this.remove();
    }
  };

  Planet.prototype.remove = function () {
    this.background.planets.removePlanet(this);
  };


})();
