function GameView(computer) {
  this.computer = computer;
}

GameView.prototype = {
  iterator: function() {
    var delay = 400;
    for (var i = 0; i <= this.computer.positionInArray; i++) {
      //This if/else statement 100 seconds to call the lightIn function if the color is the same as the index before.
      if (this.computer.sequence[i] == this.computer.sequence[i-1]) {
        this.lightIn(this.computer.sequence[i], delay + 100);
        delay += 400;
        this.lightOut(this.computer.sequence[i], delay);
      } else {
        this.lightIn(this.computer.sequence[i], delay);
        delay += 400;
        this.lightOut(this.computer.sequence[i], delay);
      }
    }
    if (player.inGame = true) {
      this.computer.positionInArray++;
    }
  },
  lightIn: function (color, delay) {
    lightInID = setTimeout(function () {
      $("#" + color).css("opacity", "1");
    }, delay);
    this.computer.shutDownSequence.push(lightInID);
  },
  lightOut: function (color, delay) {
    setTimeout(function () {
        $("#" + color).css("opacity", "0.6");
    }, delay);
  },
  displayMessage: function(input, state) {
    if (state != "gameLost") {
      $(".message_section").html(input).showAndHide();
    } else {
        $(".message_section").html(input).show();
    }
  }
}
