var player = new Player(0, 0, false);
var computer = new Computer();
var gameView;

$("#start_button").on("click", function(evt) {
  evt.preventDefault();
  if (player.inGame === false) {
    player.inGame = true;
    player.roundNumber += 1;
    computer.generateSequence();
    gameView = new GameView(computer);
    console.log(gameView.iterator());
    timeOutID = gameView.displayMessage("<p>ROUND "+player.round+"</p>", "start")
  } else {
    timeOutID = gameView.displayMessage("<p>ALREADY IN GAME</p>", "error")
  }
})



$("#reset_button").on("click", function (evt) {
  evt.preventDefault();
  endGame("reset");
  gameView = new GameView(computer);

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

  for (var i = 0; i < computer.shutDownSequence.length; i++) {
    clearTimeout(computer.shutDownSequence[i]);
  }

  if (state === "reset") {
    gameView.displayMessage("<p>GAME RESET</p>", "reset");
  } else {
    clearTimeout(timeOutID)
    gameView.displayMessage("<p>YOU LOST IN ROUND " + (player.round) + "!" + "</p>", "gameLost");
  }
  player.round = 0;
  player.clickNumber = 0;
  computer.sequence = [];
}
