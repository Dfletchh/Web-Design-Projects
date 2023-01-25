/***  appendNewCard(parentElement)

OVERVIEW:
This is the first function we're going to write in our project. The purpose of this function is to add a single new card element to the page (it won't have any pictures yet). We are going to "construct" this element and place it on the page using our knowledge of DOM Manipulation.
*/
function appendNewCard(parentElement) {
  // Make a variable for the card element. Assign it to a new div.
  let newCard = document.createElement("div");

  // Add the "card" class to the card element.
  // newCard.classList.add("card");
  newCard.className = "card";

  // Write the HTML for the children of the card element (card-down and card-up)
  newCard.innerHTML = `<div class="card-down"></div> <div class="card-up"></div>`;

  // Make the card element a "child" of the parentElement
  parentElement.appendChild(newCard);

  return newCard;
}
// appendNewCardTest();


/***  shuffleCardImageClasses()

OVERVIEW:
We've defined image classes in the CSS named 'image-1' through 'image-6' that, when applied to a card, will make it show that particular image when it's flipped. Since the matching game works with pairs of images, we want to generate a random array with two of each image class string (12 total).
*/
function shuffleCardImageClasses() {
  let cardImages = [
                      'image-1', 'image-1',
                      'image-2', 'image-2',
                      'image-3', 'image-3',
                      'image-4', 'image-4',
                      'image-5', 'image-5',
                      'image-6', 'image-6'
                    ];
  
    // Shuffle using CDN library
   return _.shuffle(cardImages);
}
// shuffleCardImageClassesTest();


/***  createCards()

OVERVIEW:
For each of the 12 cards in the game, this function will create a card, assign it a random image class, and create an object to represent that card in our program.
*/
function createCards(parentElement, shuffledImageClasses) {
  // An empty array to hold our card objects.
  let list = [];

  // Loop to create all 12 cards.
  for (let i = 0; i < shuffledImageClasses.length; i++) {
    // New card to store the result
    let currentCard = appendNewCard(parentElement);
    // Add an image class to the new card element
    currentCard.classList.add(shuffledImageClasses[i]);

    // A new object representing this card
    card = {
      index: i,
      element: currentCard,
      imageClass: shuffledImageClasses[i]
    };
    // Append the new card object to the array of card objects.
    list.push(card);
  }
  // Return the array of card objects.
  return list;
}
// createCardsTest();


/***  doCardsMatch
OVERVIEW:
Given two card objects, this will check if the card objects show the same image when flipped.
*/
function doCardsMatch(cardObject1, cardObject2) {
  return cardObject1.imageClass == cardObject2.imageClass;
}
// doCardsMatchTest();


/* An object used below as a dictionary to store counter names and their respective values.  Do you remember using objects as dictionaries? If not, go back to that lecture to review. */
let counters = {};


/***  incrementCounter 
 
OVERVIEW:
Adds one to a counter being displayed on the webpage (meant for counting flips and matches).
*/
function incrementCounter(counterName, parentElement) {
  // Undefined counter settup
  if (counters[counterName] === undefined) 
    counters[counterName] = 0;
  
  // Increment the counter for 'counterName'
  counters[counterName]++;

  // Display the new counter value
  parentElement.innerHTML = counters[counterName];
}
// incrementCounterTest();


/* Variables storing an audio objects to make the various sounds.  See how it's used for the 'click' sound in the provided function below.  */
let clickAudio = new Audio('audio/click.wav');
let matchAudio = new Audio('audio/match.wav');
let winAudio = new Audio('audio/win.wav');


/***  flipCardWhenClicked
[The implementation of this function has been provided for you but you will still need to understand and call it.]

OVERVIEW:
Attaches a mouseclick listener to a card (i.e. onclick), flips the card when clicked, and calls the function 'onCardFlipped' after the flip is complete.
*/
function flipCardWhenClicked(cardObject) {
  // Adds an "onclick" attribute/listener to the element that will call the function below.
  cardObject.element.onclick = function() {
    // THE CODE BELOW RUNS IN RESPONSE TO A CLICK.

    // Card is already flipped, return.
    if (cardObject.element.classList.contains("flipped")) {
      return;
    }
    // Play the "click" sound.
    clickAudio.play();

    // Add the flipped class immediately after a card is clicked.
    cardObject.element.classList.add("flipped");

    // Wait 500 milliseconds (1/2 of a second) for the flip transition to complete and then call onCardFlipped.
    setTimeout(function() {
      // THE CODE BELOW RUNS AFTER a 500ms delay.
      onCardFlipped(cardObject);
    }, 500);
  };
}


let lastCardFlipped = null;
/***  onCardFlipped
 
OVERVIEW:
This is called each time the user flips a card and should handle and track the game mechanics like: "Is this the first or second card flipped in a sequence?", "Do the cards match", and "Is the game over?"
*/
function onCardFlipped(newlyFlippedCard) {
  // Add one to the flip counter UI.
  let flipElement = document.getElementById("flip-count");
  incrementCounter('flip', flipElement);

  // Base case to set 'lastCardFlipped'
  if (flipElement.innerHTML%2 !== 0) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }
  // Two cards flipped but the cards don't match
  else if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }
  // Else two matching cards instance
  else {
    // Increment the match counter
    let matchesElement = document.getElementById("match-count");
    incrementCounter('matches', matchesElement);

    // TODO Add glow effect
    // hoover
    // newlyFlippedCard.style.border = "2px solid blue"

    // Play appropriate audio
    if (matchesElement.innerHTML == 6) {
      winAudio.play();
    } else {
      matchAudio.play();
    }
    // Reset
    lastCardFlipped = null;
  }
}


// Set up the game.
let cardObjects = 
  createCards(document.getElementById("card-container"), shuffleCardImageClasses());

if (cardObjects != null) {
  for (let i = 0; i < cardObjects.length; i++) {
    flipCardWhenClicked(cardObjects[i]);
  }
}
