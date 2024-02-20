function finishRoutingGame(infotextID){
    isGame=false;
    qIn=qInInit;
    var roundedTime=parseFloat(time).toFixed(1);
    var messageText=updateHighscores(nick,roundedTime,
				     "routingGame_Highscores");
    document.getElementById(infotextID).innerHTML=messageText;
    console.log("Game finished in ",time," seconds!");
  document.getElementById("startStopDiv").style.visibility="hidden";
    myStartStopFunction(); // reset game
}