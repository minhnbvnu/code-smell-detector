function toggleRoadID(){
  if(drawRoadIDs){
    drawRoadIDs=false;
    document.getElementById("buttonRoadID").innerHTML="Show road IDs";
  }
  else{
    drawRoadIDs=true;
    document.getElementById("buttonRoadID").innerHTML="Do not show road IDs";
  }
}