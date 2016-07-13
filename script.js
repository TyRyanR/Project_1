var player = {
  round: 0,
  streak: 0,
  inGame: false
};
var computer = {
  sequence: [],
}

var clickNumber = 0;
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
var shutDown = [];
/**** lightInID is used to capture the ID of the lightIn function
shutDown is an array used to keep track of all current lightInId values so that they can all be cleared upon game ending
****/

/********************************
WHEN YOU CLICK THE START BUTTON
********************************/
$("#start_button").on("click", function(evt) {
  evt.preventDefault();
  if (player.inGame === false) {
    player.round += 1;
    player.inGame = true;
    timeOutID = $(".message_section").html("<p>ROUND "+player.round+"</p>").showAndHide();
    generateNewColor();
  } else {
    timeOutID = $(".message_section").html("<p>ALREADY IN GAME</p>").showAndHide();
  }
})

/********************************
WHEN YOU CLICK THE RESET BUTTON
********************************/
$("#reset_button").on("click", function (evt) {
  evt.preventDefault();
  endGame("reset");
})

/********************************
FUNCTION THAT AUTOMATICALLY GENERATES NEW COLOR AND PUSHES TO COMPUTER.SEQUENCE ARRAY
********************************/
function generateNewColor() {
  var newNumber = Math.floor(Math.random() * ((4-0)+1) + 0);
  if (newNumber === 1) {
    computer.sequence.push("green");
  } else if (newNumber === 2) {
    computer.sequence.push("red");
  } else if (newNumber === 3) {
    computer.sequence.push("yellow");
  } else {
    computer.sequence.push("blue");
  }
  iterator();
}

/********************************
FUNCTION THAT ITERATES THROUGH COMPUTER.SEQUENCE AND LIGHTS CORRESPONDING BUTTONS UP
********************************/
function iterator() {
  //var delay is created so that every iteration through computer.sequence, the delay can increase.
    var delay = 400;
    for (var i = 0; i < computer.sequence.length; i++) {
      //This if/else statement 100 seconds to call the lightIn function if the color is the same as the index before.
      if (computer.sequence[i] == computer.sequence[i-1]) {
        lightIn(computer.sequence[i], delay + 100);
        delay += 400;
        lightOut(computer.sequence[i], delay);
      } else {
        lightIn(computer.sequence[i], delay);
        delay += 400;
        lightOut(computer.sequence[i], delay);
      }
    }
}

/********************************
TWO FUNCTIONS - ONE CREATES THE LIGHT UP EFFECT, AND ONE REMOVES IT AFTER A DELAY
********************************/
function lightIn(color, delay) {
  lightInID = setTimeout(function () {
    $("#" + color).css("opacity", "1");
  }, delay);

  shutDown.push(lightInID);
  // this pushes each new lightInID value to an array called shutDown, so that if I need to stop displaying all buttons after the setTimeout has been initiated from the interator function, I can cancel all at once by iterating through - as shown in the endGame function.
}

function lightOut(color, delay) {
  setTimeout(function () {
      $("#" + color).css("opacity", "0.6");
  }, delay);
}

/********************************
ON MOUSEUP EVENT
********************************/
$(".game_button").on("mouseup", function(evt) {
  evt.preventDefault();
  if (player.inGame == true) {
    if ($(this).attr("id") === computer.sequence[clickNumber]) {
      clickNumber = clickNumber + 1;
      $(this).css("opacity", "0.6");
        if (computer.sequence.length == clickNumber) {
          nextRound();
      }
    } else {
      endGame();
    }
  }
});

/********************************
ON MOUSEDOWN EVENT
********************************/
$(".game_button").on("mousedown", function(evt) {
    if (player.inGame == true) {
      $(this).css("opacity", "1");
    }
});

/********************************
FUNCTION THAT INITIATES A NEW ROUND, BASICALLY STARTS THE LOOP OVER TO GENERATE NEW COLOR
********************************/
function nextRound() {
    clickNumber = 0;
    player.round += 1;
    timeOutID =  $(".message_section").html("<p>ROUND "+player.round+"</p>").showAndHide();
    generateNewColor();
}

/********************************
FUNCTION THAT ENDS THE GAME EITHER ON CLICKING RESET, OR PRESSING WRONG BUTTON
********************************/
function endGame(state) {
  $(".message_section").html("");
  for (var i = 0; i < shutDown.length; i++) {
    clearTimeout(shutDown[i]);
  }
  if (state === "reset") {
    timeOutID = $(".message_section").html("<p>GAME RESET</p>").showAndHide();
  } else {
    clearTimeout(timeOutID)
    $(".message_section").html("<p>YOU LOST IN ROUND " + (player.round) + "!" + "</p>").show();
  }
  player.round = 0;
  player.inGame = false;
  clickNumber = 0;
  computer.sequence = [];
}

// /***********************
// PSEUDO-CODE
// ***********************/
// /*
//
// random button sequence generator function
// generate new number 1-4 and save to variable
// push this new number to the end of the pattern array
// call light up sequence function, passing pattern array through as argument
// //
//
// light up sequence function (pattern)
// for loop go through each iteration of the pattern array and
// $(element).eq(i).opacity-increase
// $(element).eq(i).opacity-decrease to default
// //
// generalMessage = Your turn!
// display general message
// call userTurn function passing pattern through
// //
//
// userTurn function (pattern)
// var userSequence = [];
// for loop length of pattern sequence
// onclick ($anybutton)
// $(this).opacity-increase
// $(this).opacity-decrease to default
// if $(this).eq() equals pattern[i]
// console.log(true)
// streak += 1
// if i = pattern.length - 1
// generalMessage = "awesome job. Next round"
// round += 1
// random button sequence generator function
// else
// generalMessage = "wrong guess nice try. Click start to reset the game"
// break;
