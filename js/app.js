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
let matches = 0;
const board = $(".deck");
const stars = $(".fa-star");
let starCount = 3;
const movesText = $(".moves");
let moves = 0;
const timerText = $(".timer");
let seconds = 0;
let gameTimer = undefined;
const restartButton = $(".restart");

// Reset the playing board by shuffling the deck, clearing the board, and repopulating the board.
function reset() {
  clearInterval(gameTimer);
  deck = shuffle(deck);
  openCards.length = 0;
  matches = 0;
  board.empty();
  stars.addClass("filled");
  starCount = 3;
  movesText.text("0");
  moves = 0;
  seconds = 0;
  timerText.text(seconds);
  for (let card of deck) {
    let deal = `<li class="card"><i class="fa ${card}"></i></li>`;
    board.append(deal);
  }
  gameTimer = setInterval(addTime, 1000);
}

// Timekeeping
function addTime() {
  seconds++;
  timerText.text(seconds);
}

// Convert seconds to HMS from https://stackoverflow.com/a/37096512
function convertTime(d) {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);

  let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
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
    card.addClass("match animated bounce");
    setTimeout(function() {
      card.removeClass("open show animated bounce");
    }, 600);
    matches++;
  }
  cleanUp();
}

// Handle mismatched pairs.
function mismatchedCards() {
  for (let card of openCards) {
    card.addClass("wrong animated tada");
    setTimeout(function() {
      card.removeClass("open show wrong animated tada");
    }, 600);
  }
  cleanUp();
}

// 12 moves = 3 stars, 16 moves = 2 stars, 20 moves = 1 star, 24 moves = none
function tallyStars() {
  if (moves === 21) {
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

// Clean up after a move is made.
function cleanUp() {
  openCards.length = 0;
  moves++;
  movesText.text(moves);
  tallyStars();
  if (matches === deck.length) {
    endGame();
  }
}

// Dialog giving statistics after completing the game.
function endGame() {
  clearInterval(gameTimer);
  setTimeout(function() {
    swal({
      title: "Congratulations!",
      html: `<p>You made ${moves} moves in ${convertTime(
        seconds
      )}. You won ${starCount} stars!</p><p>Would you like to play again?</p>`,
      type: "success",
      showCancelButton: true,
      confirmButtonColor: "#02ccba",
      cancelButtonColor: "#c9302c",
      confirmButtonText: "Yes!"
    })
      .then(reset)
      .catch(swal.noop);
  }, 1000);
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
