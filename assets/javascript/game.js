var wins = 0;

    var asciiArtArray = [
"                                      _",
"                                     /~\\                           ",
"                                    (o o)      We're doomed!       ",
"                                    _\\=/_                          ",
"                    ___        #   /  _  \\   #                     ",
"                   /() \\        \\\\//|/.\\|\\\\//                      ",
"                 _|_____|_       \\/  \\_/  \\/                       ",
"                | | === | |         |\\ /|                          ",
"                |_|  O  |_|         \\_ _/                          ",
"                 ||  O  ||          | | |                          ",
"                 ||__*__||          | | |                          ",
"                |~ \\___/ ~|         []|[]                          ",
"                /=\\ /=\\ /=\\         | | |                          ",
"________________[_]_[_]_[_]________/_]_[_\\_________________________"];
    var asciiArtString = '';
    var words = ["CHEWBACCA","YODA","THE-FORCE","LUKE","SITH","LIGHTSABER","JEDI","PADAWAN","DARTH-VADER","DEATH-STAR","HAN-SOLO","DROID","EWOK","FIRST-ORDER"];
    var lettersGuessedIncorrectly;
    var word;
    var currentWord;
    var blankedWordWithGuesses;
    var numOfGuesses = 7;

var startGame = function(word){
    lettersGuessedIncorrectly = [];
    word = getRandomWord();
    blankedWordWithGuesses = replaceWordWithBlanks(word.length);
    updateCorrectGuesses(blankedWordWithGuesses);
    listenForKeyPress(); 
    updateIncorrectGuesses('');
    currentWord = word;
};

var getRandomWord = function(){
    return words[Math.floor(Math.random() * words.length)];
};

var listenForKeyPress = function(){
    document.onkeypress = handleKeyPress;
};

var checkGuess = function(letter, word){
    return word.indexOf(letter) > -1 && lettersGuessedIncorrectly.indexOf(letter) < 0 && blankedWordWithGuesses.indexOf(letter) < 0;
};

var replaceWordWithBlanks = function(length){
    var str = '';
    for (var i = 0; i < length; i ++){
        str = str + "_";
    }
    return str; 
};

var fillInGuesses = function(letter, word, blankedWordWithGuesses){
    console.log(blankedWordWithGuesses);
    var str = blankedWordWithGuesses;
    var word = word;
    var pos;
    while(word.indexOf(letter) > -1){
        pos = word.indexOf(letter);
        str = str.slice(0,pos) + letter + str.slice(pos+1);
        word = word.slice(0,pos) + "0" + word.slice(pos+1);
    }
    return str;
};
 
var checkIfOutOfGuesses = function(){
    return lettersGuessedIncorrectly.length > numOfGuesses; 
};

var checkIfWordIsComplete = function(string){
    return string.indexOf("_") < 0;
};

var handleKeyPress = function(event){
    console.log(event.key.toUpperCase());
    console.log(currentWord);
    var guess = event.key.toUpperCase();
    if (checkGuess(guess, currentWord)){
        handleCorrectGuess(guess);
    } else {
        handleIncorrectGuess(guess);
    }
};

var handleCorrectGuess = function(guess){
    console.log("You Guesses Correctly");
    blankedWordWithGuesses = fillInGuesses(guess, word, blankedWordWithGuesses);
    updateCorrectGuesses(blankedWordWithGuesses);
    if (checkIfWordIsComplete(blankedWordWithGuesses)){
        handleWin();
    }
};

var handleIncorrectGuess = function(guess){
    console.log("You Guesses InCorrectly");
    lettersGuessedIncorrectly.push(guess);
    updateIncorrectGuesses(lettersGuessedIncorrectly.join(', '));
    updateHangmanArt();
    if (checkIfOutOfGuesses()){
        handleLoss();
    }
};

var updateHangmanArt = function (){
    var totalLines = asciiArtArray.length;
    var percentage = lettersGuessedIncorrectly.length / numOfGuesses;
    var linesToShow = Math.floor(totalLines * percentage);
    var art = '';
    for (var i=0; i <linesToShow; i ++){
        art = art+asciiArtArray[i] +"\n";
    }
    var element = document.getElementById('hangman-art');
    element.innerHTML = art;
};

var updateIncorrectGuesses = function(string){
    var element = document.getElementById("incorrect-guesses");
    element.innerHTML = string;
};

var updateCorrectGuesses = function(string){
    var element = document.getElementById("correct-guesses");
    element.innerHTML = string;
};

var handleWin = function(){
    wins++;
    var winBox = document.getElementById("wins");
    winBox.innerHTML = wins;
    alert("You saved them!");
};

var handleLoss = function(){
    alert("Their oil is on your hands, loser!");
};

startGame();

function reset() {
startGame ();
};