var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

function playSound(color) {
  var color = new Audio("./sounds/" + color + ".mp3");
  color.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (currentLevel === gamePattern[userClickedPattern.length - 1]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      level = 0;
      gamePattern = [];
      userClickedPattern = [];
    }, 200);
  }
}

$(document).on("keydown", function (e) {
  if (gamePattern.length === 0) {
    nextSequence();
  }
});

$(".btn").on("click", function (e) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern[userClickedPattern.length - 1]);
});
