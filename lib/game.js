;(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (dimX, dimY) {
    this.score = 0;
    this.level = 1;
    this.dimX = dimX;
    this.dimY = dimY;
    this.isPaused = true;
    this.asteroids = [];
    this.bullets = [];
    this.bulletsFired = 0;
    this.livesLeft = 3;
    this.asteroidsDestroyed = 0;
    this.addAsteroids();
    this.ship = new Asteroids.Ship ({game: this});
    this.background = new Asteroids.Background({
      game: this,
      pos: [this.dimX / 2, this.dimY / 2],
      vel: [0,0],
      settings: {},
    });
    this.background.isGameBackground = true;
  };
  // Game.DIM_X = 500;
  // Game.DIM_Y = 500;
  Game.NUM_ASTEROIDS = 3;

  Game.prototype.randomPosition = function () {
    var x = Math.random() * this.dimX;
    var y = Math.random() * this.dimY;
    if ((x > this.dimX / 2 - 50 && x < this.dimX / 2 + 50) ||
       (y > this.dimY / 2 - 50 && y < this.dimY / 2 + 50)) {
         return this.randomPosition();
    }
    else {
      return [x, y];
    }

  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < this.level; i++) {
      this.asteroids.push(new Asteroids.Asteroid({
        size: Asteroids.Asteroid.STARTINGSIZE,
        pos: this.randomPosition(),
        game: this
      }));
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.dimX, this.dimY);

    this.allObjects().forEach(function (obj) {
      obj.draw(ctx);
    });
    ctx.fillStyle = "rgba(10, 242, 255, 0.75)";
    ctx.fillRect(0, 0, this.dimX, 30);
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("Lives Left: " + this.livesLeft, 100, 20);
    ctx.fillText("Shield Life: " + this.ship.shield.life, 190, 20);
    ctx.fillText("Score: " + (this.score + this.ship.shield.life - this.bulletsFired * 10), 300, 20);
    ctx.fillText("Bullets Fired: " + this.bulletsFired, this.dimX -365, 20);
    ctx.fillText("Asteroids Destroyed: " + this.asteroidsDestroyed, this.dimX - 240, 20);
    ctx.font = "bold 24px sans-serif";
    ctx.fillStyle = "#F2F0F8";
    ctx.fillText("Galaxy Shooter", this.dimX / 2 - 60, 20);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (obj) {
      obj.move();
      obj.decay && obj.decay();
    });
  };

  Game.prototype.wrap = function (pos) {
    if (pos[0] >= this.dimX + 10) {
      pos[0] = 0;
    } else if (pos[0] <= -10) {
      pos[0] = this.dimX;
    } else if (pos[1] >= this.dimY + 10) {
      pos[1] = 0;
    } else if (pos[1] <= -10) {
      pos[1] = this.dimY;
    }
  };

  Game.prototype.checkCollisions = function() {
    this.asteroids.forEach(function(asteroid) {
      if (this.ship.isCollidedWith(asteroid)) {
        this.ship.loseLife();
        this.livesLeft--;
      }
      this.bullets.forEach(function(bullet) {
        if (asteroid.isCollidedWith(bullet)) {
          this.remove(asteroid);
          this.score += 100;
          asteroid.spawnChildren();
          this.remove(bullet);
          this.asteroidsDestroyed++;
        }
      }.bind(this));
      if (this.ship.shield.isCollidedWith(asteroid)) {
        this.remove(asteroid)
        asteroid.spawnChildren();
        this.asteroidsDestroyed++;
      }
    }.bind(this));
  };

  Game.prototype.step = function () {
    this.checkKeys();
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.checkKeys = function () {
    if (key.isPressed('up')) {
      this.ship.power(1);
      this.ship.engineOn = true;
    } else {
      this.ship.engineOn = false;
    }
    if (key.isPressed('right')) {
      this.ship.turn(Math.PI / 24);
    }
    if (key.isPressed('down')) {
      this.ship.power(-0.3);
    }
    if (key.isPressed('left')) {
      this.ship.turn(-Math.PI / 24);
    }
    if (key.isPressed('z')) {
      if (this.ship.shield.life > 0) {
        this.ship.shield.isOn = true;
      }
    } else {
      this.ship.shield.isOn = false;
    }
  };
  Game.prototype.remove = function (obj) {
    if (obj instanceof Asteroids.Bullet) {
      this.bullets = this.bullets.filter(function(el) {
        return obj !== el;
      })
    }

    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids = this.asteroids.filter(function (el) {
        return obj !== el;
      })
    }

  };
  Game.prototype.togglePause = function () {
    //game loop will not step game if isPaused is true
    console.log('togglePause paused?: ' + this.isPaused);
    (this.isPaused) ? (this.isPaused = false) : (this.isPaused = true);
    return true;
  };
  Game.prototype.allObjects = function () {
    return []//[this.background]
      .concat(this.ship)
      .concat(this.bullets)
      .concat(this.ship.shield)
      .concat(this.asteroids);
  };

})();
