// Create game variables used globally
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
const movesText = $(".moves");
let moves = 0;

// Reset the playing board by shuffling the deck, clearing the board, and repopulating the board
function reset() {
  deck = shuffle(deck);
  board.empty();
  movesText.text("0");
  for (let card of deck) {
    let deal = `<li class="card"><i class="fa ${card}"></i></li>`;
    board.append(deal);
  }
  // Handle clicking on cards. Disable on open and matched cards.
  $(".deck").on("click", "li:not(.open, .match)", function() {
    flipCard($(this));
  });
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

// Animate card flipping
function flipCard(card) {
  card.addClass("open show");
  openCards.push(card);
  if (openCards.length === 2) {
    compareCards();
  }
}

// Compare two cards
function compareCards() {
  if (openCards[0].html() === openCards[1].html()) {
    matchedCards();
  } else {
    mismatchedCards();
  }
}

// Handle matched pairs
function matchedCards() {
  for (let card of openCards) {
    setTimeout(function() {
      card.removeClass("open show");
      card.addClass("match");
    }, 600);
  }
  cleanUp();
}

// Handle mismatched pairs
function mismatchedCards() {
  for (let card of openCards) {
    setTimeout(function() {
      card.removeClass("open show");
    }, 600);
  }
  cleanUp();
}

// Clean up after a move is made
function cleanUp() {
  openCards.length = 0;
  moves++;
  movesText.text(moves);
}

// Start the game
$(document).ready(reset());

/*
 * X  set up the event listener for a card. If a card is clicked:
 * X   - display the card's symbol (put this functionality in another function that you call from this one)
 * X   - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * X   - if the list already has another card, check to see if the two cards match
 * X     + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * X     + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
