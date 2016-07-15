var player = new Player(0, 0, false);
var computer = new Computer();
var gameView;

$("#start_button").on("click", function(evt) {
  evt.preventDefault();
  if (player.inGame === false) {
    player.inGame = true;
    player.roundNumber += 1;
    gameView = new GameView(computer);
    gameView.computer.generateSequence();
    gameView.iterator();
    timeOutID = gameView.displayMessage("<p>ROUND "+player.round+"</p>", "start")
  } else {
    timeOutID = gameView.displayMessage("<p>ALREADY IN GAME</p>", "error")
  }
})

$("#reset_button").on("click", function (evt) {
  evt.preventDefault();
  gameView.gameEnder("reset");
  gameView = new GameView(computer);
})

$(".game_button").on("mousedown", function(evt) {
    if (player.inGame == true) {
      $(this).css("opacity", "1");
    }
});

$(".game_button").on("mouseup", function(evt) {
  evt.preventDefault();
  if (player.inGame == true) {
    if ($(this).attr("id") === computer.sequence[player.clickNumber]) {
      player.clickNumber = player.clickNumber + 1;
      $(this).css("opacity", "0.6");
        if (player.clickNumber == computer.positionInArray) {
          console.log("hell yeah");
          gameView = new GameView(computer)
          player.clickNumber = 0;
          gameView.iterator();
      }
    } else {
      gameView.gameEnder();
    }
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
