
// init gobal vars
var $FIRST_CARD = false;
var $SECOND_CARD = false;
var SCORE = 0;
var CARDS_REVELAED = 0;
var CARDS_ON_DECK = 0;

var FAILED_SOUND = new Audio("wave/failed.wav");
var SUCCESS_SOUND = new Audio("wave/success.wav");
var WIN_SOUND = new Audio("wave/win.mp3");

$(document).ready(function() {
  console.log("init");
  
  resetScore();

  // init our event
  var counter = 0;
  $("#main_table td .card").each(function() {
    counter++;

    $(this).on("click", onCardTapped);
  });

  // save the amount of cards
  CARDS_ON_DECK = counter;

  // define card values
  var card_values = [];
  for (var x=0; x < counter / 2; x++) {
    card_values.push(x);
    card_values.push(x);
  }

  // shuffle cards values
  card_values = shuffleArray(card_values);

  // add values to cards
  $("#main_table td .card").each(function() {
    $(this).text(card_values.shift()); //shift() returns first element of array and deletes it fromt the array
  });

  console.log("# of cards: " + counter);

}); // close document ready

/******************************
// Callbacks / Functions
*******************************/

// onCardTapped
function onCardTapped(event) {
  console.log("Card was tapped");

  if ($FIRST_CARD && $FIRST_CARD.is($(this))) {
    console.log("same item was tapped twice.");
    return;
  }

  if (!$FIRST_CARD) {
    setFirstCard($(this));
  }
  else if (!$SECOND_CARD) {
    setSecondCard($(this));
    compareCards();
  }
  else {
    resetBothCards();
    setFirstCard($(this));
  }
}


/******************************
// Helper
*******************************/

/* card related stuff */
function compareCards() {
  if ($FIRST_CARD.text() == $SECOND_CARD.text()) {
    userWins();
  }
  else {
    userLoses();
  }
}

function setFirstCard($card) {
  console.log("Set first card.");

  $FIRST_CARD = $card;
  $FIRST_CARD.addClass("active");
}

function setSecondCard($card) {
  console.log("Set second card.");

  $SECOND_CARD = $card;
  $SECOND_CARD.addClass("active");
}

function resetBothCards() {
  $FIRST_CARD.removeClass("active");
  $SECOND_CARD.removeClass("active");

  $FIRST_CARD.removeClass("lost");
  $SECOND_CARD.removeClass("lost");

  $FIRST_CARD = false;
  $SECOND_CARD = false;
}

/* win and lose related stuff */
function userWins() {
  console.log("User wins.");

  SUCCESS_SOUND.play();

  $FIRST_CARD.addClass("won");
  $SECOND_CARD.addClass("won");
  
  $FIRST_CARD.removeClass("active");
  $SECOND_CARD.removeClass("active");

  SCORE++;
  updateScore();

  CARDS_REVELAED++;
  if (CARDS_REVELAED == CARDS_ON_DECK / 2) {
    gameIsWon();
  }
}

function userLoses() {
  console.log("User loses.");

  FAILED_SOUND.play();

  $FIRST_CARD.addClass("lost");
  $SECOND_CARD.addClass("lost");

  SCORE--;
  updateScore();
}

function gameIsWon() {
  console.log("Game is over. User has won.")

  var custom_string = ". Well done!";
  if (SCORE < 2) {
    custom_string = ". You have the memory of an 88 year old."
  }

  alert("You WON!!! Your score is " + SCORE + custom_string);

  WIN_SOUND.play();

  $("#main_table td .card").each(function() {
    $(this).addClass("winner");
  });
}

/* score related stuff */
function updateScore() {
  $("#score").text(SCORE);
}

function resetScore() {
  SCORE = 0;
  updateScore();
}


/******************************
// Other stuff
*******************************/

/* randomizes arrays */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}