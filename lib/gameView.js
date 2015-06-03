;(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx, docWidth, docHeight) {
    this.game = new Asteroids.Game(docWidth, docHeight);
    this.ctx = ctx;
    this.docWidth = docWidth;
    this.docHeight = docHeight;
  };

  GameView.prototype.resetGame = function () {
    this.game = new Asteroids.Game(
      this.docWidth,
      this.docHeight
    );
    this.start(this.canvasEl);
  };
  GameView.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");
    this.bindKeyHandlers();
    this.intervalId = setInterval(function () {
      this.checkWin();
      if (this.game.isPaused === false) {
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
    key('a', this.game.togglePause.bind(this.game));
    // key('r', this.resetGame.bind(this));
    key('z', this.game.ship.shield.turnOn.bind(this.game.ship.shield));
  }

  GameView.prototype.checkWin = function () {
    if (this.game.asteroids.length == 0) {
      console.log("win condition?");
      $("#win-screen").removeClass("hidden");
      // var accuracy = Math.floor(
      //   this.game.bulletsFired / this.game.asteroidsDestroyed * 100);
      // var cheat = "<p>But it seems you liked using your shield you hacker!</p>"
      // $(".win-screen").append(
      //   "<p>Your shooting accuracy was: " + accuracy + "</p>"
      //   );
      // if (this.game.shield.life < -50) {
      //   $(".win-screen").append(cheat);
      // }
      clearInterval(this.intervalId);
    } else if (this.game.livesLeft == 0) {
      $("#lose-screen").removeClass("hidden");
      clearInterval(this.intervalId);
    } else {
      return;
    }

  };




})();
