;( function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (args) {
    this.color = Bullet.COLOR;
    this.radius = Bullet.RADIUS;
    this.pos = args.pos;
    this.vel = args.vel;
    this.speed = args.speed;
    this.angle = args.angle;
    this.life = Bullet.LIFE;
    Asteroids.MovingObject.call(this, args);
  }

  Bullet.LIFE = 50;
  Bullet.COLOR = "#FF0000";
  Bullet.RADIUS = 5;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.decay = function () {
    this.life -= 1;
    if (this.life <= 0) {
      this.game.remove(this);
    }
  };

})();
