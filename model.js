/****
This clickNumber variable is used to track the index of the computer.sequence array...
It will allow, on click, for the program to figure out if the button clicked has the same value as the index number in the computer.sequence array...
It resets every round in the nextRound function below by setting clickNumber back to 0, aka index 0 of computer.sequence
****/
var timeOutID;
/****
Setting timeOutID to equal the ID number of anything that has the .showAndHide call so that anytime between now and x seconds, I can CLEAR the ID of that async function occuring, and just cancel it. Since you cannot cancel the jquery delay method,
this is a more manual way.
****/
var lightInID;

function Player(round, clickNum, inGame) {
  this.roundNumber = round;
  this.clickNumber = clickNum;
  this.inGame = inGame;
}

function Computer() {
  this.sequence = [];
  this.shutDownSequence = [];
  this.message = "";
}

Computer.prototype = {
  generateSequence: function() {
    for (var i = 0; i < 40; i++) {
      var newNumber = Math.floor(Math.random() * ((4-0)+1) + 0);
      this.sequence.push(newNumber);
    }
  },
  iterator: function() {
    var delay = 400;
    for (var i = 0; i < computer.sequence.length; i++) {
      //This if/else statement 100 seconds to call the lightIn function if the color is the same as the index before.
      if (this.sequence[i] == this.sequence[i-1]) {
        lightIn(this.sequence[i], delay + 100);
        delay += 400;
        lightOut(this.sequence[i], delay);
      } else {
        lightIn(this.sequence[i], delay);
        delay += 400;
        lightOut(this.sequence[i], delay);
      }
    }
  },
  lightIn: function (color, delay) {
    lightInID = setTimeout(function () {
      $("#" + color).css("opacity", "1");
    }, delay);
    this.shutDownSequence.push(lightInID);
  },
  lightOut: function (color, delay) {
    setTimeout(function () {
        $("#" + color).css("opacity", "0.6");
    }, delay);
  }
}
