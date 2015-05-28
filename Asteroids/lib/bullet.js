;( function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (args) {
    args.color = Bullet.COLOR;
    args.radius = Bullet.RADIUS;
    args.life = 80;
    Asteroids.MovingObject.call(this, args);
  }


  Bullet.COLOR = "#FF0000";
  Bullet.RADIUS = 2;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.decay = function () {
    this.life -= 1;
    if (this.life <= 0) {
      this.game.remove(this);
    }
  };

})();
