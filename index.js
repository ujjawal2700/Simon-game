const buttonColor = ["red", "blue", "green", "yellow"]; //fixed array of colors
var gamePattern = [];
var userClickPattern = [];
var start = false;
var level = 0;

$(document).keypress(function (event) {
  if (event.key == "a") {
    start = true;
    startGame();
  }
});

function startGame() {
  nextSequence();
  start = true;
  $(document).off("keypress");
}

function startOver() {
  $("h1").text("Press A key to start");
  gamePattern = [];
  userClickPattern = [];
  start = false;
  level = 0;
}

// function userInput() {
  //setting the handler on click event.
  $(".btn").click(function () {
    // getting the id or the button that clicked
    var userChosenColor = $(this).attr("id");
    // adding the user chosen color to the user click pattern array
    userClickPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    // for flashing animation
    $("#" + userChosenColor)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
      checkAnswer(userClickPattern.length - 1);
  });

// }

function checkAnswer(currentLevel) {
  console.log(gamePattern);
  console.log(userClickPattern);
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    if (gamePattern.length === userClickPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    start = false;
    gameOver();
  }
}

function nextSequence() {
    userClickPattern = [];
  level++;
  $("#level-title").text("level " + level);
  var rand = Math.random() * 4;
  rand = Math.floor(rand);
  var randomChosenColor = buttonColor[rand];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  userInput();
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 1000);
  $("h1").text("Game over, Press any key to restart");
  playSound("wrong");
  startOver();
}

function playSound(name) {
  // for playing the audio according to the selected color.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  // adding the pressed class to the pressed button.
  var toggle = $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    toggle.removeClass("pressed");
  }, 100);
}
