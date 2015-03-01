(function(){
  if (typeof Hanoi === "undefined"){
    window.Hanoi = {};
  }

  var View = Hanoi.View = function(game, $main){
    this.game = game;
    this.$main = $main;
    this.$stacks = $('.stack');
    this.render();
    this.grabbed = null;
  };

  View.prototype.render = function() {
    this.$stacks.removeClass("top");
    $('.disc').remove();
    this.$stacks.off();
    for (var i = 0; i < 3; i++ ){
      this.renderStack(i);
    };
  };

  View.prototype.renderStack = function(i) {
    var top = "";
    var that = this;
    for (var j = 0; j < this.game.towers[i].length; j++ ) {
      if (j === this.game.towers[i].length - 1) {
        top = "top";
      }
      $(this.$stacks[i]).prepend('<div class="disc ' + top
        + ' d' + this.game.towers[i][j] + '">');
      if (j === this.game.towers[i].length - 1) {
        $('.d' + this.game.towers[i][j]).on('click', function() {
          that.clickTower(i);
        });
      }
    };

    for (var j = 0; j < 4 - this.game.towers[i].length; j++ ) {
      $(this.$stacks[i]).prepend('<div class="disc ghost">');
    };

    if (this.game.towers[i].length === 0) {
      $(this.$stacks[i]).addClass("top").on('click', function() {
        that.clickTower(i);
      });
    }
  }

  View.prototype.clickTower = function(indx){
    if (this.grabbed !== null) {
      this.game.move(this.grabbed, indx);
      this.grabbed = null;
      this.render();
      if (this.game.isWon()) {
        this.ending();
      }
    } else {
      this.grabbed = indx;
    }
  }

  View.prototype.ending = function () {
    alert("Congratulations, you won!");
    var answer = prompt("Play Again? yes/no");
    if (answer === 'yes'){
      window.location = window.location;
    } else {
      alert(":(");
    }
  }

})();
