;(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship ({game: this});
  };
  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.NUM_ASTEROIDS = 5;

  Game.prototype.randomPosition = function () {
    var x = Math.random() * Game.DIM_X;
    var y = Math.random() * Game.DIM_Y;

    return [x, y];
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid({
        pos: this.randomPosition(),
        game: this
      }));
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (obj) {
      obj.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    if (pos[0] >= Game.DIM_X + 10) {
      pos[0] = 0;
    } else if (pos[0] <= -10) {
      pos[0] = Game.DIM_X;
    } else if (pos[1] >= Game.DIM_Y + 10) {
      pos[1] = 0;
    } else if (pos[1] <= -10) {
      pos[1] = Game.DIM_Y;
    }
  };

  Game.prototype.checkCollisions = function() {
    this.asteroids.forEach(function(asteroid) {
      if (this.ship.isCollidedWith(asteroid)) {
        this.ship.relocate();
      }
    }.bind(this));
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {
    this.asteroids = this.asteroids.filter(function (el) {
      return asteroid !== el;
    })
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship);
  };

})();
