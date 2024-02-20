function zoomOut() {
    var gameContainerWidth = document.getElementById("gameContainer").style.width;
    var gameContainerHeight = document.getElementById("gameContainer").style.height;
    document.getElementById("gameContainer").style.width = "50%"
    document.getElementById("gameContainer").style.height = "50%"
    document.getElementById("zoomInGameScreenInput").disabled = false; 
    document.getElementById("zoomOutGameScreenInput").disabled = true;
    document.getElementById("zoomInGameScreenInput2").disabled = false; 
    document.getElementById("zoomOutGameScreenInput2").disabled = true; 
    document.getElementById("loadButtonGroup").style.width = "900px";
  }