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

  Background.prototype.draw = function (ctx) {
    this.planets.forEach(function(planet) {
      planet.draw(ctx);
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
      this.addPlanets();
    if (this.time % 50 === 0) {
      return;
    }
  };

  Background.prototype.addPlanets = function () {
    var max = Math.floor(Math.random() * 10 - 6);
    this.count += 1;
    for (var i = 0; i < max; i++) {
      var planet =
      this.planets.push(new Asteroids.Planet({
        angle: Math.PI * 2 * i / max + this.count,
        game: this.game,
        background: this,
        pos: [this.game.dimX / 2, this.game.dimY / 2]
      }));
    }
  };

  Background.prototype.removePlanet = function(planet) {
    this.planets = this.planets.filter(function(el) {
      return planet !== el;
    });
  };

})();