let cardNodeList = document.querySelectorAll('i');
let cardArray = Array.from(cardNodeList);

function shuffle(cardArray) {
    var currentIndex = cardArray.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardArray[currentIndex];
        cardArray[currentIndex] = cardArray[randomIndex];
        cardArray[randomIndex] = temporaryValue;
    }

    return cardArray;
}

const allCards = document.querySelectorAll('.card');
let openCards = [];
let matchedCards = [];
let moves = 0;
let time = 0;
let stars = 0;
let formatedTime = 0;


function shuffleCards() {
  const allCardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const cardsShuffled = shuffle(allCardsToShuffle);
  for (card of cardsShuffled) {
    const deck = document.querySelector('.deck');
    deck.appendChild(card);
  }
}
shuffleCards();

function reload () {
  const reloadButton = document.querySelector('.fa-repeat');

  reloadButton.addEventListener('click', function () {
    location.reload();
  })
};
reload ();

function clickedCard (card) {
  openCards.push(card);
  card.classList.add('open', 'show');
}

function match() {
  openCards[0].classList.add('match');
  openCards[1].classList.add('match')
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  matchedCards.push(openCards[0], openCards[1]);
  openCards = [];
};

function noMatch() {
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  openCards = [];
};

function countTime() {
  let timer = setInterval(startTimer, 1000);
  const movesTimer = document.querySelector('.seconds');

  function startTimer() {
  time++;
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);
  if (seconds <10){
      movesTimer.innerHTML = `${minutes}:0${seconds}`;
      formatedTime = movesTimer.innerHTML;
  }else{
      movesTimer.innerHTML = `${minutes}:${seconds}`;
      formatedTime = movesTimer.innerHTML;
  }
  if (matchedCards.length == 16){
    clearInterval(timer);
    toggleModal ();
    }
  }
}


//I have spent hours trying to figure out why this function toggles twice- could you please help?? The modal appears but instantly disappears :(
function toggleModal () {
  const modal = document.querySelector('.modal');
  const modalTime = document.querySelector('.modalTime');
  const modalStars = document.querySelector('.modalStars');
  const modalMoves = document.querySelector('.modalMoves');
  modal.classList.toggle('hide');
  modalTime.innerHTML = `Total Time = ${formatedTime}`;
  modalStars.innerHTML = `Stars = ${stars}`;
  modalMoves.innerHTML = `Moves = ${moves}`;
};


//the "Close" button of the mdoal doesn't work either but I think it has to do with the above. Could you please help me with these two? thank you! :)
document.querySelector('.modalClose').addEventListener('click', function (){
  toggleModal();
});

document.querySelector('.modalRestart').addEventListener('click', function () {
  location.reload();
  toggleModal();
});

function numberOfMoves () {
  moves++;
  const movesCounter = document.querySelector('.moves');
  movesCounter.innerHTML = moves;
  starsScore ();
};

function starsScore () {
  let firstStar = document.querySelector('.firstStar');
  let secondStar = document.querySelector('.secondStar');
  if (moves < 10) {
    stars = 3;
  }
  if (moves == 10) {
    firstStar.remove();
    stars = 2;
  };

  if (moves == 15) {
    secondStar.remove();
    stars = 1;
  };
};


allCards.forEach(function(card) {
  card.addEventListener('click', function (e) {
      if (!card.classList.contains ('open', 'show', 'match') && (openCards.length == 0 || openCards.length == 1 )) {
        clickedCard (card);

        if (time == 0) {
          countTime ();
        };

        if (openCards.length == 2) {
            numberOfMoves();
            if (openCards[0].querySelector('i').classList.item(1) === openCards[1].querySelector('i').classList.item(1)) {
                return match();
            } else {
                return setTimeout(function (){
                    return noMatch();
                    }, 1000);
                 };
             };
         };
     });
});
