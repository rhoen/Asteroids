;(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");
    this.bindKeyHandlers();
    var intervalId = setInterval(function () {
      this.checkWin();
      if (this.game.isPaused == false) {
        $(".pause-screen").addClass("hidden");
        this.game.step();
        this.game.draw(ctx);
      } else {
        $('.pause-screen').removeClass("hidden");
        return;
      }
    }.bind(this), 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    key('up', this.game.ship.power.bind(this.game.ship, 2));
    // key('right', this.game.ship.power.bind(this.game.ship, [2,0]));
    key('down', this.game.ship.power.bind(this.game.ship, -2));
    // key('left', this.game.ship.power.bind(this.game.ship, [-2,0]));
    key('space', this.game.ship.fireBullet.bind(this.game.ship));
    key('p', this.game.togglePause.bind(this.game));
    key('z', this.game.ship.shield.turnOn.bind(this.game.ship.shield));
  }

  GameView.prototype.checkWin = function () {
    if (this.game.asteroids.length == 0) {
      $(".win-screen").removeClass("hidden");
      clearInterval(intervalId);
    }

  };




})();
