;(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Background = Asteroids.Background = function(args) {
    this.planets = [];
    this.time = 0;
    this.count = 0;
    this.game = args.game;
  };

  Background.prototype.draw = function () {
    this.planets.forEach(function(planet) {
      planet.draw();
    });
  };

  Background.prototype.decay = function () {
    this.planets.forEach(function(planet) {
      planet.decay();
    });
  };

  Background.prototype.move = function () {
    this.planets.forEach(function(planet) {
      planet.move();
    });
    this.time += 1;
    if (this.time % 100 === 0) {
      this.addPlanets();
    }
  };

  Background.prototype.addPlanets = function () {
    var max = 12;
    this.count += 1;
    for (var i = 0; i < max; i++) {
      var planet =
      this.planets.push(new Asteroids.Planet({
        angle: Math.PI * 2 * i / max + this.count,
        game: this.game,
        background: this,
        pos: args.pos = [args.game.dimX / 2, args.game.dimY / 2]
      }));
    }
  };

  Background.prototype.removePlanet = function(planet) {
    this.planets = this.planets.filter(function(el) {
      return obj !== el;
    });
  };

})();
