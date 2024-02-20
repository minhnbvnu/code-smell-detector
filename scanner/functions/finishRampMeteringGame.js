function finishRampMeteringGame(infotextID){
  isGame=false;
  qIn=qInInit;
  qOn=qOnInit;
  setSlider(slider_qIn, slider_qInVal, 3600*qIn, commaDigits, " Fz/h");
  setSlider(slider_qOn, slider_qOnVal, 3600*qOn, commaDigits, " Fz/h");

  var roundedTime=parseFloat(time).toFixed(1);
  var messageText=updateHighscores(nick,roundedTime,
				     "rampMeteringGame_Highscores");
  document.getElementById(infotextID).innerHTML=messageText;
  console.log("Game finished in ",time," seconds!");
  document.getElementById("startStopDiv").style.visibility="hidden";
  myStartStopFunction(); // reset game
}