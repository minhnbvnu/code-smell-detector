function toggleVehID(){
  if(drawVehIDs){
    drawVehIDs=false;
    for(var ir=0; ir<network.length; ir++){network[ir].drawVehIDs=drawVehIDs;}

    document.getElementById("buttonVehID").innerHTML="Show vehicle IDs";
  }
  else{
    drawVehIDs=true;
    for(var ir=0; ir<network.length; ir++){network[ir].drawVehIDs=drawVehIDs;}
    document.getElementById("buttonVehID").innerHTML="Do not show vehicle IDs";
  }
}