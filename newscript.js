$("#start_button").on("click", function(evt) {
  evt.preventDefault();
  var player = new Player(0, 0, true);
  var computer = new Computer();
})














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
  player.inGame = false;
  $(".game_button").css("opacity", "0.6");
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
  clickNumber = 0;
  computer.sequence = [];
}
