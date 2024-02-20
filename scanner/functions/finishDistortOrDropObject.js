function finishDistortOrDropObject(xUser, yUser){
  if(false){
    console.log("itime=",itime," in finishDistortOrDropObject (canvas_gui):",
    		" trafficObjPicked=",trafficObjPicked,
   		" roadPicked=",roadPicked,
  		"");
  }

  mousedown=false;
  touchdown=false;
  
  if(distDrag<distDragCrit){
    //console.log("  end finishDistortOrDropObject: dragging crit",
//		" distDrag =",distDrag,"< distDragCrit=",distDragCrit,
//		" not satisfied (only click) => do nothing)");
    return;
  }


  if(roadPicked){
    userCanvasManip=true; // if true, new backgr, new road drawn
    roadPicked=false;
    //console.log(" before draggedRoad.finishCRG()");
    draggedRoad.finishCRG();
    handleDependencies(); // !! needed if road length changed by road distort
    console.log("  end finishDistortOrDropObject: distorted road");
  }


  if(trafficObjPicked){

    var distCrit_m=20;  // optimize!!
    var distCritPix=distCrit_m*scale;
    trafficObjs.dropObject(trafficObject, network, 
			   xUser, yUser, distCritPix, scale);
    trafficObjPicked=false;
    console.log("  end finishDistortOrDropObject: dropped object!");
  }

  
}