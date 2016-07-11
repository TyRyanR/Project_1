/***********************
PSEUDO-CODE
***********************/






/*****************************


var generalMessage = click start to begin
var pattern = [];


if user clicks start button
      var round = 0
      var streak = 0
      generalMessage div displays countdown from 3
      call random button sequence generator function
//


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
