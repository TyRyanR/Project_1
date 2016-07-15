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

function Player(round, clickNumber, inGame) {
  this.roundNumber = round;
  this.clickNumber = clickNumber;
  this.inGame = inGame;
}

function Computer() {
  this.sequence = [];
  this.shutDownSequence = [];
  this.position = 1;
}

Computer.prototype = {
  generateSequence: function() {
    for (var i = 0; i < 40; i++) {
      var newNumber = Math.floor(Math.random() * ((4-0)+1) + 0);
      if (newNumber == 1) {
        this.sequence.push("green");
      } else if (newNumber == 2) {
        this.sequence.push("red");
      } else if (newNumber == 3) {
        this.sequence.push("yellow");
      } else {
        this.sequence.push("blue");
      }
    }
  }
}
