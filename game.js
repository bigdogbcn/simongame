/// *************** ARRAYS ***************
let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let hasStarted = false;

let level = 0;

$(".btn").click(function (e) {
  let userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function () {
  if (hasStarted === false) {
    $("#level-title").text("LEVEL " + level);
    nextSequence();
    hasStarted = true;
  }
});

/// ********** FUNCTIONS **********

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("LEVEL " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeToggle()
    .fadeToggle();

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    let audioWrong = new Audio("sounds/wrong.mp3");
    audioWrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    if (level > 10) {
      $("#level-title").html(
        "GAME OVER!!! <BR><BR> BIG BRAINS <BR> 🧠🧠🧠🧠🧠 "
      );

      setTimeout(function () {
        starOver();
      }, 2000);
    } else if (level > 5) {
      $("#level-title").html("GAME OVER!!! <BR><BR> AVERAGE BRAIN <BR> 🧠🧠");

      setTimeout(function () {
        starOver();
      }, 2000);
    } else {
      $("#level-title").html("GAME OVER!!! <BR><BR> TINY BRAIN <BR> 🧠");

      setTimeout(function () {
        starOver();
      }, 2000);
    }
  }
}

function starOver() {
  gamePattern = [];
  hasStarted = false;
  level = 0;
  $("#level-title").html("PRESS ANY KEY TO START");
}
