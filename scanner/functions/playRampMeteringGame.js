function playRampMeteringGame(infotextID){ // only called in html
  Math.seedrandom(42);console.log("in Math.seedrandom(42) playRampMeteringGame");
  isGame=true;
  document.getElementById("startStopDiv").style.visibility="visible";
  myRestartFunction();
  nick = prompt("Please enter your nick", nick);
  var debug=false;
  if(debug){
    time=1000*Math.random(); // gets score in finish...
    finishRampMeteringGame("infotextRampMeteringGame");
  }
}