;(function () {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (args) {
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.vel = [0,0];
    this.speed = 0;
    this.angle = -Math.PI / 2;
    this.pos = [args.game.dimX / 2, args.game.dimY / 2];
    this.shield = new Asteroids.Shield({
      pos: args.pos, game: args.game, ship: this
    });
    this.calculatePoints();
    this.hitBoxRadius = Ship.HITBOXRADIUS;
    Asteroids.MovingObject.call(this, args);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 30;
  Ship.COLOR = "#DDDDDD";
  Ship.MAXSPEED = 15;
  Ship.MINSPEED = -4;
  Ship.HITBOXRADIUS = 1;

  Ship.prototype.turn = function (impulse) {
    this.angle += impulse;
  };

  Ship.prototype.loseLife = function () {
    // var x = Math.random() * Asteroids.Game.DIM_X;
    // var y = Math.random() * Asteroids.Game.DIM_Y;
    var x = this.game.dimX / 2;
    var y = this.game.dimY / 2;
    this.setAfterDeathCooldown();
    this.pos = [x,y];
  };

  Ship.prototype.setAfterDeathCooldown =  function () {
    this.afterDeathCooldown = 25;
  };

  Ship.prototype.power = function (impulse) {
    this.speed += impulse;
  };

  Ship.prototype.decay = function () {
    //called on every step.
    if (this.speed > Ship.MAXSPEED) {
      this.speed = Ship.MAXSPEED;
    }
    if (this.speed < Ship.MINSPEED) {
      this.speed = Ship.MINSPEED;
    }
    if (this.afterDeathCooldown > 0) {
      this.afterDeathCooldown--;
      this.invincible = true;
    } else {
      this.invincible = false;
    }

    this.speed *= 0.95;
  };

  Ship.prototype.fireBullet = function () {
    var speed = (this.speed > 14) ? this.speed * 1.2 : 16;
    var pointX = this.pos[0] + Math.cos(this.angle) * this.radius;
    var pointY = this.pos[1] + Math.sin(this.angle) * this.radius;
    var bullet = new Asteroids.Bullet({
      // speed: speed,
      speed: speed,
      pos: [pointX, pointY],
      angle: this.angle,
      game: this.game
    });
    this.game.bullets.push(bullet);
    this.game.bulletsFired++;
  };

  Ship.prototype.isCollidedWith = function (otherObject) {
    var boxes = [];
    var collision = false;
    var collideFunc = Asteroids.MovingObject.prototype.isCollidedWith;
    boxes.push({pos: this.pointPos});
    boxes.push({pos: this.bottomPointPos});
    boxes.push({pos: this.topPointPos});
    boxes.push({pos: Asteroids.Util.midpoint(
      this.pointPos,
      this.bottomPointPos
    )});
    boxes.push({pos: Asteroids.Util.midpoint(
      this.pointPos,
      this.topPointPos
    )});
    boxes.forEach(function(box){
      box.radius = this.hitBoxRadius;
      if (collideFunc.call(box, otherObject)) {
        console.log('colided!');
        collision = true;
      }
    }.bind(this))
    if (this.invincible) {
      collision = false;
    }
    return collision;
  };

  Ship.prototype.calculatePoints = function () {
    var r = this.radius;
    var x, y;
    if (this.pos) {
      x = this.pos[0];
      y = this.pos[1];
    }
    this.bottomAngle = (this.angle + 3 * Math.PI / 4);
    this.topAngle = (this.angle - 3 * Math.PI / 4);
    this.pointPos = [
      x + Math.cos(this.angle) * r,
      y + Math.sin(this.angle) * r
    ];
    this.bottomPointPos = [
      x + Math.cos(this.bottomAngle) * r,
      y + Math.sin(this.bottomAngle) * r
    ];
    this.topPointPos = [
      x + Math.cos(this.angle - 3 * Math.PI / 4) * r,
      y + Math.sin(this.angle - 3 * Math.PI / 4) * r
    ];
    this.innerPointPos = [
      x + Math.cos(this.angle) * -0.2 * r,
      y + Math.sin(this.angle) * -0.2 * r
    ];
  };

  Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    this.calculatePoints();
    if (this.engineOn) {
      ctx.beginPath();
      ctx.arc(
        this.pos[0],
        this.pos[1],
        this.radius,
        this.bottomAngle,
        this.topAngle
      );
      ctx.lineTo(this.pos[0], this.pos[1]);
      ctx.lineTo(this.bottomPointPos[0], this.bottomPointPos[1]);
      ctx.fillStyle = "red";
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(this.pointPos[0], this.pointPos[1]);
    ctx.lineTo(this.bottomPointPos[0], this.bottomPointPos[1]);
    ctx.lineTo(this.innerPointPos[0], this.innerPointPos[1]);
    ctx.lineTo(this.topPointPos[0], this.topPointPos[1]);
    ctx.lineTo(this.pointPos[0], this.pointPos[1]);

    if (this.invincible) {
      ctx.fillStyle = 'purple';
      ctx.fill();
    } else {
      ctx.fillStyle = this.color;
      ctx.fill();
    }

  };

})();
