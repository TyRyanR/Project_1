/***********************
USER STORIES
***********************/

1) As a user, I want my program to display four quarter-circles: top left being green, top right being red, bottom right being green, and bottom left being white.

2) As a user, I want the game to automatically light up in a random sequence of quarter-circles, then prompting me to match that random sequence.

3) As a user, I want the game to allow me to progress to the next round only if I match the generated random sequence on my turn.

4) As a user, I want the game difficulty to increase automatically every round, beginning the game at one light, and increasing by one light each time I match the correct sequence

5) As a user, I want the game to reset if I mismatch the correct sequence

6) As a user, I want messages to display when it is my turn, when I have matched the correct sequence, and when I have failed to match the correct sequence.

7) As a user, I want a button to start the game, and a separate button to reset the game.

8) As a user, I want to be able to resize the window and have the design be responsive.

/***********************
Technologies Used
***********************/

HTML
CSS
JAVASCRIPT
JQUERY

/***********************
Approach Taken
***********************/

I wanted the core of this program to be the computer randomly generating a number 1-4, each corresponding to a colored quadrant in the Simon game. From there, I had that color pushed to the end of the array. Each iteration, the computer would run through that array, lighting up each quadrant (by changing the div's opacity). When that sequence was complete, it becomes the user's turn to match that sequence. On each click, if the ID of that clicked on div matches the value of the current index in the sequence array, it would allow the user to continue pressing buttons. If not, it would end the game because you have clicked a wrong button in the sequence of arrays.

Also, a custom jQuery library was created, which has to do with displaying the messages at the bottom, including the fade in and fade out behavior.

/***********************
Installation Instructions
***********************/


/***********************
Unsolved Problems
***********************/
