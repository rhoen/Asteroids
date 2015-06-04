;(function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Background = Asteroids.Background = function(args) {
    this.planets = [];
    this.time = 0;
    this.count = 0;
    this.game = args.game;
    this.pos = args.pos;
    this.vel = args.vel;
    this.setDefaults(args);
  };

  Background.DEFAULTS = {
    maxFunc: function () {
      return Math.floor(Math.random() * 10 - 6)
    },
    modConstant: 50,
    countChange: 1,
  };

  Background.prototype.setDefaults = function (args) {
    var set = args.settings;
    var def = Background.DEFAULTS;
    this.maxFunc = set.maxFunc || def.maxFunc;
    this.modConstant = set.modConstant || def.modConstant
    this.countChange = set.countChange || def.countChange
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
    if (this.time % this.modConstant === 0) {
      return;
    }
  };

  Background.prototype.addPlanets = function () {
    var max = this.maxFunc();
    // var max = 12
    this.count += this.countChange;
    for (var i = 0; i < max; i++) {
      var planet =
      this.planets.push(new Asteroids.Planet({
        angle: Math.PI * 2 * i / max + this.count,
        game: this.game,
        background: this,
        pos: this.pos,
        settings: {},
      }));
    }
  };

  Background.prototype.removePlanet = function(planet) {
    this.planets = this.planets.filter(function(el) {
      return planet !== el;
    });
  };

})();
