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
    this.asteroid = args.asteroid;
  };

  Background.DEFAULTS = {
    maxFunc: function () {
      return Math.floor(Math.random() * 10 - 6)
    },
    modConstant: 0,
    countChange: 0,
    planetSettings: {},
  };

  Background.prototype.setDefaults = function (args) {
    var set = args.settings;
    var def = Background.DEFAULTS;
    this.maxFunc = set.maxFunc || def.maxFunc;
    this.modConstant = set.modConstant || def.modConstant;
    this.countChange = set.countChange || def.countChange;
    this.planetSettings = set.planetSettings || def.planetSettings;
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
    if (this.time % this.modConstant === 0) {
      this.addPlanets();
    }
  };

  Background.prototype.addPlanets = function () {
    var max = this.maxFunc();
    // var max = 12
    this.count += this.countChange;
    for (var i = 0; i < max; i++) {
      this.planets.push(new Asteroids.Planet({
        angle: Math.PI * 2 * i / max + this.count,
        game: this.game,
        background: this,
        pos: this.pos,
        settings: this.planetSettings,
      }));
    }
  };

  Background.prototype.removePlanet = function(planet) {
    this.planets = this.planets.filter(function(el) {
      return planet !== el;
    });
  };

})();
