// INITIAL CONDITIONS
const colours = ["green", "red", "yellow", "blue"];
var round = 0;
var indexSequence = [];
var colourSequence = [];
var clickCount = 0;

// EVENT LISTENER 1 - ENTER TO START GAME
document.addEventListener(
  "keydown",
  function (event) {
    if (event.key == "Enter") {
      nextSequence();
    }
  },
  { once: true }
);

// EVENT LISTENER 2 - CLICK TO RECALL SEQUENCE
for (let i = 0; i < document.querySelectorAll("button").length; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", function () {
    var colourAttempt = this.classList[0];
    clickCount++;
    buttonEffect(colourAttempt); // Sound and depress
    // Verification
    if (
      colourAttempt === colourSequence[clickCount - 1] &&
      clickCount === colourSequence.length
    ) {
      clickCount = 0;
      console.log(clickCount);
      nextSequence();
    } else if (
      colourAttempt === colourSequence[clickCount - 1] &&
      clickCount !== colourSequence.length
    ) {
      // Do Nothing
    } else {
      gameOver();
    }
  });
}

// SEQUENCE
function nextSequence() {
  round++;
  document.querySelector("h1").innerHTML = "Level " + round;
  var randomIndex = Math.floor(Math.random() * 4);
  var colourOrdered = colours[randomIndex];
  indexSequence.push(randomIndex);
  colourSequence.push(colourOrdered);
  playAnimation(colourOrdered);
}

// GAME OVER
function gameOver() {
  document.querySelector("body").classList.add("wrong-background");
  document.querySelector("h1").classList.add("wrong-text");
  document.querySelector("h1").innerHTML = "Game Over - Press Enter to Restart";
  var audio = new Audio("./sounds/wrong.mp3");
  audio.play();
  document.addEventListener(
    "keydown",
    function (event) {
      if (event.key == "Enter") {
        document.querySelector("body").classList.remove("wrong-background");
        document.querySelector("h1").classList.remove("wrong-text");
        window.location.reload();
      }
    },
    { once: true }
  );
}

// SUPPORTING FUNCTIONS

// Button Animation
function playAnimation(colourOrdered) {
  // Pre Animation Delay
  timeoutOne = setTimeout(function () {
    document.querySelector("button." + colourOrdered).classList.add("opaque");
    var audio = new Audio("./sounds/" + colourOrdered + ".mp3");
    audio.play();
  }, 1500);
  // Animation Delay
  timeoutTwo = setTimeout(function () {
    document
      .querySelector("button." + colourOrdered)
      .classList.remove("opaque");
  }, 1800);
}

// Button Effect - On Press
function buttonEffect(colourAttempt) {
  // Pre Animation Delay
  timeoutOne = setTimeout(function () {
    document.querySelector("button." + colourAttempt).classList.add("opaque");
    var audio = new Audio("./sounds/" + colourAttempt + ".mp3");
    audio.play();
  }, 0);
  // Animation Delay
  timeoutTwo = setTimeout(function () {
    document
      .querySelector("button." + colourAttempt)
      .classList.remove("opaque");
  }, 300);
}
