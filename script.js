var player = {
  round: 0,
  streak: 0,
  inGame: false
};

var computer = {
  sequence: [],
}

// This clickNumber variable is used to track the index of the computer.sequence array
// It will allow, on click, for the program to figure out if the button clicked has the same value
      // as the index number in the computer.sequence array.
// It resets every round in the youMayPass function below by setting clickNumber back to 0, aka index 0 of computer.sequence

var clickNumber = 0;
var timeOutID;

$("#start_button").on("click", function(evt) {
  if (player.inGame == false) {
    evt.preventDefault();
    player.round += 1;
    player.inGame = true;
    timeOutID = $(".message_section").html("<p>ROUND "+player.round+"</p>").showAndHide();
    generateSequence();
  } else {
    timeOutID = $(".message_section").html("<p>ALREADY IN GAME</p>").showAndHide();
  }
})

$("#reset_button").on("click", function (evt) {
  // All this can be refactored possibly into an END GAME function.
  evt.preventDefault();
  player.round = 0;
  player.inGame = false;
  clickNumber = 0;
  computer.sequence = [];
  $(".message_section").html("");
  // Setting timeOutID to equal the ID number of anything that has the .showAndHide call so that anytime between now and
    // x seconds, I can CLEAR the ID of that async function occuring, and just cancel it. Since you cannot cancel the jquery delay method,
      // this is a more manual way.
  timeOutID = $(".message_section").html("<p>GAME RESET</p>").showAndHide();
})

function generateSequence() {
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

function iterator() {

  // This was great. Added 100 seconds to call the lightIn function if the color is the same as the index before.
  var delay = 400;
  for (var i = 0; i < computer.sequence.length; i++) {
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

function lightIn(color, delay) {
  setTimeout(function () {
      $("#" + color).css("opacity", "1");
  }, delay);
}

function lightOut(color, delay) {
  setTimeout(function () {
      $("#" + color).css("opacity", "0.6");
  }, delay);
}

$(".game_button").on("mouseup", function(evt) {
  evt.preventDefault();
  if (player.inGame == true) {
    if ($(this).attr("id") === computer.sequence[clickNumber]) {
      clickNumber = clickNumber + 1;
      $(this).css("opacity", "0.6");
        if (computer.sequence.length == clickNumber) {
          youMayPass();
      }
    } else {
      //Thinking about refactoring here. Maybe create an END game function that resets everything??
      clearTimeout(timeOutID)
      $(".message_section").html("<p>YOU LOST IN ROUND " + (player.round) + "!" + "</p>").show();
      console.log("you lose");
      player.round = 0;
      player.inGame = false;
      clickNumber = 0;
      computer.sequence = [];
    }
  }
});

$(".game_button").on("mousedown", function(evt) {
    if (player.inGame == true) {
      $(this).css("opacity", "1");
    }
});

function youMayPass() {
    clickNumber = 0;
    player.round += 1;
    timeOutID =  $(".message_section").html("<p>ROUND "+player.round+"</p>").showAndHide();
    generateSequence();
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
// //
//
