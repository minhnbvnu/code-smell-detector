function zoomIn() {
    document.getElementById("gameContainer").style.width = "100%"
    document.getElementById("gameContainer").style.height = "100%";
    document.getElementById("zoomInGameScreenInput").disabled = true;
    document.getElementById("zoomOutGameScreenInput").disabled = false; 
    document.getElementById("zoomInGameScreenInput2").disabled = true;
    document.getElementById("zoomOutGameScreenInput2").disabled = false;
    document.getElementById("loadButtonGroup").style.width = "1200px";
  }