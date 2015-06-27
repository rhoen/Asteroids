;(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (canvasEl, docWidth, docHeight) {
    this.game = new Asteroids.Game(docWidth, docHeight);
    this.canvasEl = canvasEl;
    this.ctx = this.canvasEl.getContext("2d");
    this.docWidth = docWidth;
    this.docHeight = docHeight;

  };

  GameView.prototype.resetGame = function () {
    window.key.resetDownKeys();
    this.game = new Asteroids.Game(
      this.docWidth,
      this.docHeight
    );
    console.log("resetGame function");
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.bindKeyHandlers();
    this.start();
  };
  GameView.prototype.replay = function () {
    if (this.game.isLost) {
      console.log('replay function');
      this.resetGame();
    }
  };
  GameView.prototype.start = function () {

    console.log("start function");
    this.intervalId = setInterval(function () {
      this.checkWin();
      console.log("loop!");
      if (this.game.isPaused === false) {
        $(".pause-screen").addClass("hidden");
        this.game.step();
        this.game.draw(this.ctx);
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
    key('r', this.replay.bind(this));
    key('c', this.levelUp.bind(this));
  }

  GameView.prototype.checkWin = function () {
    if (this.game.asteroids.length <= 0) {
      this.gameBetweenLevels = true;
      console.log("win condition?");

      var score = (this.game.score + this.game.ship.shield.life - this.game.bulletsFired * 10);
      $("#win-screen").removeClass("hidden");
      $("#score-element").html(score);

      // var accuracy = Math.floor(
      //   this.game.bulletsFired / this.game.asteroidsDestroyed * 100);
      // var cheat = "<p>But it seems you liked using your shield you hacker!</p>"
      // $(".win-screen").append(
      //   "<p>Your shooting accuracy was: " + accuracy + "</p>"
      //   );
      // if (this.game.shield.life < -50) {
      //   $(".win-screen").append(cheat);
      // }
    } else if (this.game.livesLeft <= 0) {
      debugger
      var score = (this.game.score + this.game.ship.shield.life - this.game.bulletsFired * 10);
      $("#score-element").html(score);
      $("#lose-screen").removeClass("hidden");
      this.game.isLost = true;
      clearInterval(this.intervalId);
      this.intervalId = null;
    } else {
      return;
    }
  };

  GameView.prototype.levelUp = function () {
    if (this.gameBetweenLevels) {
      this.game.level += 1;
      this.game.addAsteroids();
      console.log(this.game.asteroids);
      clearInterval(this.intervalId); //stop loop
      this.intervalId = null;
      this.start();
      $("#win-screen").addClass("hidden");
    }
  };

})();
