var colours = ["green", "red", "yellow", "blue"];
var colourSequence = [];
var colourSelected = "";
var colourResponse = [];
var i = 0;
var j = 0;
var started = false;
var randomNumberGenerator = 0;
var randomColour = "";
var soundDelay = 2000;
var fadeDelay = 500;

// Game Intitialisation
$(document).on("keypress", function () {
  if (!started) {
    $("body").css("background-color", "#2B2C28");
    $(".title").text("Level 1");
    console.log(i);
    nextRound();
    started = true;
  }
});

// Listen for Clicks
$(".button").on("click", function () {
  playSound(this.id);
  buttonClickAnimation(this.id);
  colourSelected = this.id;
  colourResponse.push(colourSelected);
  checkColours();
});

// Next Round
function nextRound() {
  i += 1;
  $(".title").text("Level " + i);
  sequence();
}

// Check Colours
function checkColours() {
  if (colourSequence.length === 0) {
    gameOver();
  } else if (colourSequence[j] !== colourResponse[j]) {
    gameOver();
  } else if (colourSequence[j] === colourResponse[j]) {
    j += 1;
    if (colourSequence.length === colourResponse.length) {
      resetRoundVariables();
      nextRound();
    }
  }
}

// Sequence
function sequence() {
  randomNumberGenerator = Math.floor(Math.random() * 4);
  randomColour = colours[randomNumberGenerator];
  colourSequence.push(randomColour);
  timeout = setTimeout(() => {
    $(`#${randomColour}`).addClass("fade");
    setTimeout(() => {
      $(`#${randomColour}`).removeClass("fade");
    }, fadeDelay);
    playSound(randomColour);
  }, soundDelay);
}

// Button Click Animation
function buttonClickAnimation(colour) {
  $(`#${colour}`).fadeOut(100).fadeIn(100);
}

// Play Sound
function playSound(colour) {
  var audio = new Audio(`sounds/${colour}.mp3`);
  audio.play();
}

// Game Over
function gameOver() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  clearTimeout(timeout);
  $(".title").text("Game Over! Press a Key to Restart");
  $("body").css("background-color", "#9B111E");
  resetGameVariables();
}

// Reset Round Variables
function resetRoundVariables() {
  j = 0;
  colourResponse = [];
}

// Reset Game Variables
function resetGameVariables() {
  i = 0;
  j = 0;
  colourResponse = [];
  colourSequence = [];
  colourSelected = "";
  started = false;
}
