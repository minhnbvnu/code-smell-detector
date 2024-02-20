function dragRoad(xUser,yUser){

    //console.log("in canvas_gui: dragRoad");

  userCanvasManip=true; // if true, new backgr, new road drawn


  // do not care of mergings although junk results happen if 
  // dragged near them 

  draggedRoad.doCRG(xUser,yUser); 

}