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

  Util.vel = function(angle, speed) {
    return [Math.cos(angle) * speed, Math.sin(angle) * speed];
  };

  Util.randVec = function () {
    var angle = Util.randAngle();
    var speed = Util.randSpeed();
    return Util.vel(angle, speed);
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
    var scale = Math.random() * 2 - 1; //num between -1 .. 1
    return scale * Math.PI * 2;
  };

  Util.midpoint = function(pos1, pos2) {
    return [(pos1[0] + pos2[0]) / 2, (pos1[1] + pos2[1]) / 2];
  };

})();
