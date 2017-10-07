// Global game object for holding data and logic
const matchGame = {
  deck: [
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
  ],
  board: $(".deck"),
  // Shuffle function from http://stackoverflow.com/a/2450976
  shuffle(array) {
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
  },
  // Animate card flipping
  flipCard(card) {
    card.addClass("open show");
  },
  // Reset the playing board by shuffling the deck, clearing the board, and repopulating the board
  reset() {
    this.deck = this.shuffle(this.deck);
    this.board.empty();
    for (let card of this.deck) {
      let deal = `<li class="card closed"><i class="fa ${card}"></i></li>`;
      this.board.append(deal);
    }
  }
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// Start game
$(document).ready(matchGame.reset());
// Handle clicking on cards
$("li")
  .not(".open")
  .click(matchGame.flipCard($(this)));
