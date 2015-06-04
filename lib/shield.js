;( function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Shield = Asteroids.Shield = function (args) {
    this.color = Shield.COLOR;
    this.radius = 0;
    this.life = 500;
    this.isOn = false;
    this.ship = args.ship;
    Asteroids.MovingObject.call(this, args);
  }
  Shield.MAXRADIUS = 50;
  Shield.COLOR = "rgba(65, 139, 246, 0.4)";

  Asteroids.Util.inherits(Shield, Asteroids.MovingObject);

  Shield.prototype.decay = function () {
    if (this.isOn) {
      this.life--;
      if (this.radius < Shield.MAXRADIUS) {
        this.radius++;
      }
    } else {
      if (this.radius > 0) {
        this.radius--;
      }
    }
  };

  Shield.prototype.move = function () {
    this.pos = this.ship.pos;
    return;
  };

  Shield.prototype.turnOn = function () {
    if (this.radius <= Asteroids.Ship.RADIUS) {
      this.radius = Asteroids.Ship.RADIUS + 1;
    }
  }

})();
