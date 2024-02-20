function showHideTLeditPanel(){
  if(trafficLightControl.isActive){ // close panel
    trafficLightControl.isActive=false; //don't redraw editor panel
    if(drawBackground){                 // wipe out existing editor panel
      ctx.drawImage(background,0,0,canvas.width,canvas.height);
    }
    document.getElementById("editTLbutton").innerHTML
      ="Open traffic-light control panel";
  }
  else{ // open panel
    trafficLightControl.isActive=true;
    document.getElementById("editTLbutton").innerHTML
      ="Close traffic-light control panel";
  }
}