;(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (args) {
    args.color = Asteroid.COLOR;
    this.size = args.size;
    args.radius = Asteroid.RADIISIZES[this.size];
    args.speed = Asteroids.Util.randSpeed();
    args.angle = Asteroids.Util.randAngle();
    Asteroids.MovingObject.call(this, args);
  };
  Asteroid.COLOR = "#000";
  Asteroid.STARTINGSIZE = 3;
  Asteroid.RADIISIZES = {
    3: 45,
    2: 25,
    1: 15,
    0: 0
  }

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.spawnChildren = function () {
    if (this.size == 1) {
      return;
    }
    var newSize = this.size - 1;
    for (var i = 0; i < 2; i++) {
      this.game.asteroids.push(new Asteroids.Asteroid({
        size: newSize,
        pos: this.pos,
        game: this.game
      }));
    }

  };

})();
