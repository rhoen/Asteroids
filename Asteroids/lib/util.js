;(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};
  Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.vec = function(angle, speedX, speedY) {
    return [Math.cos(angle) * speedX, Math.sin(angle) * speedY];
  };

  Util.randVec = function () {
    var angle = Util.randAngle();
    var speedX = Util.randSpeed();
    var speedY = Util.randSpeed();
    return Util.vec(angle, speedX, speedY);
  };

  Util.randSpeed = function () {
    var rand = Math.random;
    var speed = rand() * 10 - 5;
    if (speed < 1 && speed > -1) {
      speed = Util.randSpeed(); //ensure minimum speed
    }

    return speed;
  };

  Util.randAngle = function () {
    var scale = Math.random() * 2 - 1 //num between -1 .. 1
    return scale * Math.PI * 2
  };

})();
