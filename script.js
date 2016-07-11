var player = {
  round: 0,
  streak: 0,
  inGame: false
};

var computer = {
  sequence: [],
}

$("#start_button").on("click", function(evt) {
  evt.preventDefault();
  if (player.inGame == false) {
    player.round += 1;
    player.inGame = true;
    $(".round_number_section").html("Round: " + player.round);
    generateSequence();
  } else {
    $(".message_section").html("<p>You have already started a game. Please click reset if you would like to start over.</p>");
  }
})

function generateSequence() {
  var newNumber = Math.floor(Math.random() * ((4-0)+1) + 0);
  if (newNumber == 1) {
    computer.sequence.push("green");
  } else if (newNumber == 2) {
    computer.sequence.push("red");
  } else if (newNumber == 3) {
    computer.sequence.push("yellow");
  } else {
    computer.sequence.push("blue");
    }
  lightUpSequence();
}

function lightUpSequence() {
  // for (var i = 0; i < computer.sequence.length; i++) {
    // lightSquare(computer.sequence[i]);
  // }

  var i = 0;

  setTimeout(lightSquare(computer.sequence[i]), 500);

  playerTurn();
}





function lightSquare(color) {
  $("#" + color).css("opacity", "1");
  setTimeout(dimSquare, 500);
}

function dimSquare() {
  $(".game_button").css("opacity", "0.6");
}
// The argument computer.sequence[i] above refers to the value of the number at the ith index of the array.
// It gets passed into the colorShow function below at a set timeout, then all colors opactiy are reset to dim


//
// function colorHide() {
//   $(".game_button").css("opacity", "0.6");
// }


function playerTurn() {
  var playerSequence = [];
  var counter = 0;
  $(".message_section").html("<p>Your turn. Good luck!</p>");
  $(".game_button").on("click", function() {
     if ($(this).attr("id") == computer.sequence[counter]) {
        playerSequence.push(computer.sequence[counter]);
        counter++;
        console.log("good job");
     } else {
       console.log("GAME OVER");
     }

     if (playerSequence.length == computer.sequence.length) {
       generateSequence();
     }

})


};





/***********************
PSEUDO-CODE
***********************/
/*

random button sequence generator function
     generate new number 1-4 and save to variable
     push this new number to the end of the pattern array
     call light up sequence function, passing pattern array through as argument
//

light up sequence function (pattern)
    for loop go through each iteration of the pattern array and
    $(element).eq(i).opacity-increase
    $(element).eq(i).opacity-decrease to default
  //
    generalMessage = Your turn!
    display general message
    call userTurn function passing pattern through
//

userTurn function (pattern)
    var userSequence = [];
    for loop length of pattern sequence
      onclick ($anybutton)
        $(this).opacity-increase
        $(this).opacity-decrease to default
        if $(this).eq() equals pattern[i]
          console.log(true)
          streak += 1
          if i = pattern.length - 1
            generalMessage = "awesome job. Next round"
            round += 1
            random button sequence generator function
        else
          generalMessage = "wrong guess nice try. Click start to reset the game"
          break;
//

*****************************/
