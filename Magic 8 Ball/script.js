
/* 
   Welcome to the Magic 8-ball Project.  Complete the 
   tasks outlined by the comments in this file.

   The following functions are available to you 
   (you can just call them):

   // This will hide the '8' (if shown) and 
   // show the triangle (if hidden).  It will
   // set the text on the triangle to the
   // string 'answerText'.
   function makeAnswerAppear(answerText)
*/

/* Returns a random integer in the range 'min' through 'max' inclusive. 

   This can be taken directly from MDN documentation: 
     https://tinyurl.com/3jkxa8h3

*/
//The maximum is inclusive and the minimum is inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

/* Write a function that handles the magic 8-ball being clicked. Here are the steps:

   - Create an array containing at least 5 possible answers as strings.
   - Generate a random array index by calling 
       getRandomIntInclusive function.
   - Call 'makeAnswerAppear' using the random
       answer you selected.
   - (Level-up) Prevent your code from selecting the 
       same answer multiple times in a row 
       (loops could be required).
*/
let prev = -1;
let ans = ["Please try again...",
            "Did you try Google",
            "You Rock!",
            "Try asking Alexa",
            "Go figure...",
            "You don't say?",
            "Sounds like you need a nap",
            "Let me check with Siri on that"]; 
            
function answerQuestion() {
  while (true) {
    let cur = getRandomIntInclusive(0, 7);
    
    if (cur === prev) {
      continue;
    } else {
      makeAnswerAppear(ans[cur]);
      prev = cur;
      break;
    }
  }
}
