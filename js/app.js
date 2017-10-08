// Create game variables used globally.
let deck = [
  "fa-anchor",
  "fa-anchor",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bolt",
  "fa-bolt",
  "fa-bomb",
  "fa-bomb",
  "fa-cube",
  "fa-cube",
  "fa-diamond",
  "fa-diamond",
  "fa-leaf",
  "fa-leaf",
  "fa-paper-plane-o",
  "fa-paper-plane-o"
];
let openCards = [];
const board = $(".deck");
const stars = $(".fa-star");
let starCount = 3;
const movesText = $(".moves");
let moves = 0;
const restartButton = $(".restart");

// Reset the playing board by shuffling the deck, clearing the board, and repopulating the board.
function reset() {
  deck = shuffle(deck);
  openCards.length = 0;
  board.empty();
  stars.addClass("filled");
  starCount = 3;
  movesText.text("0");
  moves = 0;
  for (let card of deck) {
    let deal = `<li class="card"><i class="fa ${card}"></i></li>`;
    board.append(deal);
  }
  console.log(
    "After Reset   _ " +
      moves +
      " : " +
      $(".card.match").length +
      ", " +
      deck.length
  );
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Animate card flipping.
function flipCard(card) {
  card.addClass("open show");
  openCards.push(card);
  if (openCards.length === 2) {
    compareCards();
  }
}

// Compare two cards.
function compareCards() {
  if (openCards[0].html() === openCards[1].html()) {
    matchedCards();
  } else {
    mismatchedCards();
  }
}

// Handle matched pairs.
function matchedCards() {
  for (let card of openCards) {
    setTimeout(function() {
      card.removeClass("open show");
      card.addClass("match");
    }, 600);
  }
  cleanUp();
}

// Handle mismatched pairs.
function mismatchedCards() {
  for (let card of openCards) {
    setTimeout(function() {
      card.removeClass("open show");
    }, 600);
  }
  cleanUp();
}

// Clean up after a move is made.
function cleanUp() {
  openCards.length = 0;
  moves++;
  movesText.text(moves);
  console.log(
    "Before Clean  _ " +
      moves +
      " : " +
      $(".card.match").length +
      ", " +
      deck.length
  );
  getUpdate();
}

// 12 moves = 3 stars, 16 moves = 2 stars, 20 moves = 1 star, 24 moves = lose
function tallyStars() {
  if (moves === 25) {
    // end game
  } else if (moves === 21) {
    stars.eq(0).removeClass("filled");
    starCount--;
  } else if (moves === 17) {
    stars.eq(1).removeClass("filled");
    starCount--;
  } else if (moves === 13) {
    stars.eq(2).removeClass("filled");
    starCount--;
  }
}

// Check for winning conditions.
function getUpdate() {
  console.log(
    "Inside Clean  _ " +
      moves +
      " : " +
      $(".card.match").length +
      ", " +
      deck.length
  );
  tallyStars();
  if ($(".card.match").length === deck.length) {
    console.log("Alert!");
    alert("You win!");
  }
  console.log(
    "After Clean   _ " +
      moves +
      " : " +
      $(".card.match").length +
      ", " +
      deck.length
  );
}

// Start the game
$(document).ready(function() {
  // Handle clicking on cards. Disable on open and matched cards.
  board.on("click", "li:not(.open, .match)", function() {
    flipCard($(this));
  });
  // Handle clicking on the restart button.
  restartButton.click(reset);
  // Initialize the board.
  reset();
});

/*
 * X  set up the event listener for a card. If a card is clicked:
 * X   - display the card's symbol (put this functionality in another function that you call from this one)
 * X   - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * X   - if the list already has another card, check to see if the two cards match
 * X     + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * X     + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * X     + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
