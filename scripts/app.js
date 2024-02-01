// All variables initialized in the beginning to associate them with the same id's on the HTML side
let hangImg = document.getElementById("hangImg");
let mainWord = document.getElementById("mainWord");
let chances = document.getElementById("chances");
let guessInput = document.getElementById("guessInput");
let submitBtn = document.getElementById("submitBtn");
let playBtn = document.getElementById("playBtn");
let hintBtn = document.getElementById("hintBtn");
let guessLabel = document.getElementById("guessLabel");
let randomword = "";
let hint = "";
let guesses = 0;
let guessedLetter = "";

// Amount of spaces in the word that we'll need for later
let letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// call dataCall function from clicking play button upon startup
playBtn.addEventListener('click', function(){
    dataCall();
})

// call userGuess from clicking submit button
submitBtn.addEventListener('click', function(){
    userGuess();
})

// call userGuess from hitting Enter key
document.addEventListener('keypress', function(event){
    if(event.key == "Enter"){
        userGuess();
    }
})

// Function that activates once play button is clicked, hiding playBtn and setting everything that needs to be visible
function dataCall(){

    // Fetching data from data.json file, verifying file is json file, naming any info taken as data followed by value we want
    fetch("../data/data.json").then(response => response.json()).then( data => {
        // making a random number between 0 to the max number of words we've made in the json file
        let rndNum = Math.floor(Math.random() * data.words.length);

        // assigning variable randomWord to the random number generated index of the words array from the json file 
        randomWord = data.words[rndNum];

        // assigning variable hint to the random number generated index of the hints array from the json file 
        hint = data.hints[rndNum];

        // starting game function called
        startGame(randomWord);
    })

    function startGame(word){

        // Setting image to first image shown with no man, also removing hidden attribute from values on html side for game to start, hiding playBtn since no longer needed
        hangImg.src="./media/1.png"

        mainWord.removeAttribute("hidden");
        chances.removeAttribute("hidden");
        guessLabel.removeAttribute("hidden");
        guessInput.removeAttribute("hidden");
        submitBtn.removeAttribute("hidden");
        hintBtn.removeAttribute("hidden");
        playBtn.setAttribute("hidden", "hidden");


        // setting letter space to 0 for newly generated word
        letterArray = [];

        // Loop going through each letter of the word pulled from the json file to replace with "_", also joining them with the " " space inbetween them so it doesn't look like one long line, changing the chances text to number of guesses used out of 6, also making the inputbox interactable
        for(let i = 0; i < word.length; i++){
            letterArray[i] = "_";
            updateGameState();
            guessInput.readOnly = false;

            function updateGameState(){
                mainWord.innerText = letterArray.join(" ");
                chances.innerText = `Guesses Used: ${guesses} / 6`;
            }
        }
        console.log(randomWord);
    }
    
}

function userGuess(){
    guessedLetter = guessInput.value;
    guessInput.value = "";

    for (let i = 0; i < randomWord.length; i++){
        if (mainWord.contains(guessedLetter)){
            letterArray[i] = guessedLetter.toLowerCase;
        }
    }
}

