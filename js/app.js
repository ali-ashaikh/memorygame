 //list of al cards
const cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb",
"fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb" ];

//starting variables with zeros
let checking = [];
let parents = [];
let matches = 0;
let moves = 0;
let min = 0;
let sec = 0;


//Definding global variables
let stars = document.querySelector('.fa-star');
let all_cards = document.querySelector('.container');
let symbol = document.querySelectorAll('.card');

//starting the timer at the begening of the game
startTimer();

//Shuffling the cards with all initial values
document.addEventListener('load', updateCards());

//adding the reset function to the button "repeat"
document.querySelector('.fa-repeat').addEventListener('click', function(){
	updateCards();
});


//This listener checks for the clicks and according to the number of the clicked icons it will decide which function to call
all_cards.addEventListener('click', function(event){
	if (event.target.className == 'card'){ //checking if a card is clicked
		if (checking.length == 0){ //checking if only one card is clicked
			checking.push(event.target.children[0].className); //adding the clicked card to the checking list
			parents.push(event.target); //adding the card to cards list
			showCard(); //keep the card opened for now
		}
		else if (checking.length == 1) { //checking if two cards are clicked
			checking.push(event.target.children[0].className); //adding the second card to the checking list
			parents.push(event.target); //adding the card to the cards list
			showCard(); //show the second card to the player
			checkMatch(); //check if both cards are same
			moves++; //increment the number of moves by one
			document.querySelector('.moves').innerHTML = moves; //update the moves number
			if (moves == 10){ //if moves are 10 then lower the stars by one
				let stars = document.querySelector('.fa-star');
				stars.parentNode.removeChild(stars);
			}
			if (moves == 20){ //if the moves are 20 keep only one star
				let stars = document.querySelector('.fa-star');
				stars.parentNode.removeChild(stars);
			}
		}
		else { //starting checking another two cards again
			checking = [];
			parents = [];
			checking.push(event.target.children[0].className);
			parents.push(event.target);
			showCard();
		}
	}
});


//this function is to check the two selected cards if they match
function checkMatch(){
		if (checking[0] == checking[1]){
			setTimeout(function(){
				openMatched();
			}, 500);
			if (matches <= 7){
				matches++;				
			}
			if (matches == 8){
				setTimeout(function(){
					alert("Well Done. Please Play Again!! You have won in " + min + ':' + sec + ' using ' + moves + ' moves');
					updateCards();
				}, 1000);
			}
		}
		else {
			setTimeout(function(){
				parents[0].className = 'card';
				parents[1].className = 'card';
			}, 500);
		}
}


//this function is to show the card to the player
function showCard(){
	if (parents.length == 1){
		parents[0].className = 'card open show';
	}
	else if (parents.length ==2){
		parents[0].className = 'card open show';
		parents[1].className = 'card open show';
	}
}

//this function is to highlight those matched cards
function openMatched(){
	let checked = document.querySelectorAll('.'+ checking[0]);
	parents[0].className = 'card match';
	parents[1].className = 'card match';
}


//this function is to update the game and reset it
function updateCards(){
	shuffle(cards);
	for (i = 0; i < symbol.length; i++) {
		symbol[i].children[0].className = 'fa ' + cards[i];
		symbol[i].className = 'card';
	}
	min = 0;
	matches = 0;
	sec = 0;
	moves = 0;
	document.querySelector('.time').innerHTML = min + ':0' + sec;
	document.querySelector('.moves').innerHTML = moves;
	document.querySelector('.stars').innerHTML = "<li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li>" ;

}


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


//this function start the timer
function startTimer(){
	if (sec > 59){
		min++;
		sec = 0;
		document.querySelector('.time').innerHTML = min + ':0' + sec;
		sec++;
		setTimeout(startTimer, 1000);
	}
	else if (sec <= 59 && sec >= 10){
		document.querySelector('.time').innerHTML = min + ':' + sec;
		sec++;
		setTimeout(startTimer, 1000);
	}
	else if (sec <= 9 && sec >= 0){
		document.querySelector('.time').innerHTML = min + ':0' + sec;
		sec++;
		setTimeout(startTimer, 1000);
	}
}
