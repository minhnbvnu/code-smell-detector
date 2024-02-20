function playRoutingGame(infotextID){ // e.g.,  playRoutingGame("infotext");
  Math.seedrandom(42);console.log("in Math.seedrandom(42) playRoutingGame");
  isGame=true;
  document.getElementById("startStopDiv").style.visibility="visible";
  myRestartFunction();
 /* time=0;
  itime=0;
  var nregular=mainroad.nRegularVehs();
  mainroad.removeRegularVehs();
  ramp.removeRegularVehs();
*/
  nick = prompt("Please enter your nick", nick);
  var debug=false;
  if(debug){
    time=1000*Math.random(); // gets score in finish...
    finishRoutingGame("infotextRoutingGame");
  }
  Math.seedrandom(42);
  console.log("Math.random()=",Math.random());
}