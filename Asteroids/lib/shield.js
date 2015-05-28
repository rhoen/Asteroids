;( function() {
  if (typeof window.Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Shield = Asteroids.Shield = function (args) {
    args.color = Shielf.COLOR;
    args.radius = 0;
    this.life = 100;
    this.isOn = false;
    Asteroids.MovingObject.call(this, args);
  }
  Shield.MAXRADIUS = 45;
  Shield.COLOR = "purple";

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

})();
