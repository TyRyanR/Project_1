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
  lightUp();
}

function lightUp() {
  var opac = 500;
  for (var i = 0; i < computer.sequence.length; i++) {
    lighten(computer.sequence[i], opac);
    opac += 300;
    dim(opac);
  }
}

function lighten(color, opac) {
  setTimeout(function () {
    $("#" + color).css("opacity", "1");
  }, opac);
}

function dim(opac) {
  setTimeout(function () {
    $(".game_button").css("opacity", "0.6");
  }, opac);

}



// The argument computer.sequence[i] above refers to the value of the number at the ith index of the array.
// It gets passed into the colorShow function below at a set timeout, then all colors opactiy are reset to dim


//
// function colorHide() {
//   $(".game_button").css("opacity", "0.6");
// }
















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
