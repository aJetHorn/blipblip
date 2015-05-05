$(document).ready(function(){
    //Canvas
    var flatGreenHex = "#2ecc71";
    var flatGreenRGB = "rgb(46, 204, 113)";
    var flatRedHex = "#e74c3c";
    var score = 0;
    var multiplier = 1;
    var activeCell;
    var countdown_number = 60;
    var countdown;
    var streak = 0;
    

    game();
    countdown();

    function game(){
        //random tile
        var tile = (1 + Math.floor(Math.random()*9));
        $("#"+tile).css("background-color", flatGreenHex);
    };
    
    function selectNewTile(cell){
        cell.css("background-color", flatGreenHex);
        activeCell = cell;
    }
    
    function increaseScore(){
        streak++;
        //score += 1 + Math.round(1 * (streak * .25));
        score += 1 + Math.round((streak * 1.1)  * Math.pow(1.2, streak));
        $("#score").text("Score: " + score);
    }
    function decreaseScore(){
        if (score > 0){
            if (streak > 0){
                score = Math.round(score / 2);
            }
            else{
                score -= 2;
            }
            $("#score").text("Score: " + score);
        }
        else{ //if score falls below zero
            $("#score").text("You Lose!");
            if (!$("#replay").is(":visible")){
                gameOver();
            }
        } 
        if (streak > 10){
            streak -= 6;
        }
        else{
            streak = 0;
        }
        
    }
    
    function resetAllCells(){
        $(".cell").each(function(){
            $(this).css("background-color", "#2c3e50");
        });
    }
    
    function resetCell(cell){
        cell.css("background-color", "#2c3e50");
    }
    
    function selectRandomTile(){
        return $("#"+(1 + Math.floor(Math.random()*9)));
    }
    
    function gameOver(){
        playing = false;
        for (var i = 1; i < 10; i++){
            $("#" + i).css("background-color", flatRedHex);
        }
        $("#replay").toggle();
    }
    //if time runs out
    function gameEnd(){
        playing = false;
        for (var i = 1; i < 10; i++){
            $("#" + i).css("background-color", "#3498db");
        }
        $("#replay").toggle();
        $("#replay h3").text("You Scored: " + score);
        $("#replay h3").toggle();
    }

    
    $(".cell").on("click", function(){
        if ($(this).css("background-color") === flatGreenRGB){
            increaseScore();
            $(this).css("background-color", "#2c3e50");
        }
        else{
            decreaseScore();
            activeCell.css("background-color", "#2c3e50");
        }
        selectNewTile(selectRandomTile());
    });
    
    $("#playAgain").on("click", function(){
       location.reload(); 
    });
    
    //Timer
    var count = 200;
    var playing = true;

function countdown(){
    displayTime(); 
    if (count == 0) {
      playing = false;
    } else if (playing) {
      setTimeout(countdown, 100);
      count--;
    } else {
      setTimeout(countdown, 100); 
    }
}

function displayTime() {
  var tenths = count;  
  var sec = Math.floor(tenths / 10);
  document.getElementById('time_left').innerHTML = "Time: " + LeadingZero(sec);
  if (sec < 1 && playing){
      gameEnd();
  }
}

function LeadingZero(Time) {
  return (Time < 10) ? "0" + Time : + Time;
}

});
