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
    console.log("resetGame function");
    this.start(this.canvasEl);
  };
  GameView.prototype.replay = function () {
    if (this.game.isOver) {
      clearInterval(this.intervalId);
      console.log('replay function');
      this.resetGame();
    }
  };
  GameView.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");
    this.bindKeyHandlers();
    this.game.isOver = false;
    console.log("start function");
    this.intervalId = setInterval(function () {
      this.checkWin();
      console.log("loop!");
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
    key('right', this.game.ship.turn.bind(this.game.ship,  -Math.PI / 24));
    key('down', this.game.ship.power.bind(this.game.ship, -2));
    key('left', this.game.ship.turn.bind(this.game.ship, Math.PI / 24));
    key('space', this.game.ship.fireBullet.bind(this.game.ship));
    key('a', this.game.togglePause.bind(this.game));
    key('z', this.game.ship.shield.turnOn.bind(this.game.ship.shield));
    // key('r', this.replay.bind(this));
  }

  GameView.prototype.checkWin = function () {
    if (this.game.asteroids.length <= 0) {
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
      this.game.isOver = true;
      clearInterval(this.intervalId);
    } else if (this.game.livesLeft <= 0) {
      $("#lose-screen").removeClass("hidden");
      this.game.isOver = true;
      clearInterval(this.intervalId);
    } else {
      return;
    }

  };




})();
