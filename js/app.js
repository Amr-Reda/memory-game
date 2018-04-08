/*
 * Create a list that holds all of your cards
 */
// function show(arrayCard,i) {
//   var cardList = document.querySelectorAll('.card');
//   cardList[i].classList;
// }
let counter=0;
let time=0;
let openList= new Array();
let timer=document.querySelector('.timer');
let move=document.querySelector('.moves');
let stars=document.querySelectorAll('.fa-star');
let starsNumber=3;
let arrayCard = new Array();
let cardList = document.querySelectorAll('.card');
let restart=document.querySelector('#restart');
let deck = document.querySelector('#deck');
let gameSection=document.getElementById('game');
let winSection=document.getElementById('win');
let btn=document.getElementById('btn');
let movesSection=document.querySelector('.movesNumber');
let starsSection=document.querySelector('.starsNumber');
let timeSection=document.querySelector('.secondsNumber');

btn.addEventListener('click', function(){
  gameSection.setAttribute('style','display:flex;');
  winSection.setAttribute('style','display:none;');
  resetGame();
});

window.setInterval(timeCounter, 1000);

function checkWin() {
  for (var i = 0; i < cardList.length; i++) {
    if (!cardList[i].classList.contains('match')) {
      return;
    }

  }
  movesSection.innerText=counter;
  starsSection.innerText=starsNumber;
  timeSection.innerText=time;
  gameSection.setAttribute('style','display:none;');
  winSection.setAttribute('style','display:flex;');
}

for(var i=0;i<cardList.length;i++){
 arrayCard[i]=cardList[i];
 arrayCard[i].addEventListener('click', function(){
   var element=window.event.target;

   if(!element.classList.contains('open') && element.tagName=="LI"){
   element.classList.add('show');
   element.classList.add('open');
   openList.push(element);

   if (openList.length==3) {
     openList[0].classList.remove('show');
     openList[0].classList.remove('open');
     openList[0].classList.remove('wrong');
     openList[1].classList.remove('wrong');
     openList[1].classList.remove('show');
     openList[1].classList.remove('open');
     openList.reverse();
     openList.pop();
     openList.pop();
   }

   if (openList.length==2) {
     var firstCard=openList[0].firstElementChild.classList;
     var secondCard=openList[1].firstElementChild.classList;
     if(firstCard[1] === secondCard[1]){
     openList[0].classList.add('match');
     openList[1].classList.add('match');
     openList.pop();
     openList.pop();
     }
     else{
       openList[0].classList.add('wrong');
       openList[1].classList.add('wrong');
     }
   }

   counter++;
   move.innerText=counter;
 }

   if(counter==28){
     stars[0].setAttribute('style','visibility:hidden;');
     starsNumber=2;
   }

   else if (counter==35) {
     stars[1].setAttribute('style','visibility:hidden;');
     starsNumber=1;
   }

   else if (counter==40) {
     stars[2].setAttribute('style','visibility:hidden;');
     starsNumber=0;
   }
   checkWin();

 });
}




function timeCounter() {
 time++;
 timer.innerText=time;
}

function resetGame(){

  counter=0;
  time=0;
  move.innerText=counter;
  arrayCard=shuffle(arrayCard);

  for (var j = 0; j < arrayCard.length; j++) {
    deck.removeChild(cardList[j]);
  }

  for (var j = 0; j < arrayCard.length; j++) {
    deck.appendChild(arrayCard[j]);
  }

  for (var i = 0; i < stars.length; i++) {
    stars[i].setAttribute('style','visibility:visible;');
  }

  for (var i = 0; i < cardList.length; i++) {
    cardList[i].classList.remove('show');
    cardList[i].classList.remove('match');
    cardList[i].classList.remove('open');
    cardList[i].classList.remove('wrong');
  }

}

restart.addEventListener('click', resetGame);
window.addEventListener('load',resetGame);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


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
