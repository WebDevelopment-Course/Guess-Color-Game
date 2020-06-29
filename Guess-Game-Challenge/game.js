var gamePattern = [];
var userClickedPattern = [];
var buttonsColours = ["red", "blue", "green", "yellow"];

//Current game level
var currentLevel = 0;

function nextSequence(){
  //set the use pattern to empty for next user input
  userClickedPattern = [];

  //increase level by 1
  currentLevel = currentLevel + 1;
  $("#level-title").html("level " + currentLevel);

  //randomly choose a color from four colours and stores in game pattern
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonsColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //animate the chosen button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}
  //detect the buttons click
$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //sends the last index of the answer
  var length = userClickedPattern.length-1;
  checkAnswer(length);

  //plays sounds and animates for user choosen color
  playSound(userChosenColour);
  animatePress(userChosenColour);

});


function playSound(name){
  //plays the chosen sound according to user choosen color
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animates the press of button
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}

//detect keyboard click to start the gamePattern
var clicked = "false";
if (clicked == "false"){
  $(document).on("keypress",function(event){
    $("#level-title").html("Level 0");
    nextSequence();
    clicked = "true";
  });

}

//checkinmg the answer
function checkAnswer(currentLevel){
  //for correct answer
 if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
   if (gamePattern.length == userClickedPattern.length){
     setTimeout(function(){
       nextSequence();
     },1000);
   }
 }
 //for incorrect answer
   else{
     var wrong = new Audio("sounds/wrong.mp3");
     wrong.play();
     $("body").addClass("game-over");
     setTimeout(function(){
       $("body").removeClass("game-over");
     },200);
     $("#level-title").html("Game Over, Press Any Key to Restart");
     startOver();
   }

}

//Restarting the game
function startOver(){
  currentLevel = 0;
  gamePattern = [];
  clicked = false;
}
