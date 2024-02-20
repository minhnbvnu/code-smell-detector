function doDragging(xUser,yUser,xUserDown,yUserDown){

    if(mousedown||touchdown){ 
        userCanvasManip=true; // if true, new backgr, new road drawn

	distDrag=Math.sqrt(Math.pow(xUser-xUserDown,2)
			   + Math.pow(yUser-yUserDown,2));

	if(false){
	    console.log("mousemove && mousedown: roadPicked=",roadPicked,
		    " xUser=",xUser,"xUserDown=",xUserDown,
		    " distDrag=",distDrag,
		    " distDragCrit=",distDragCrit);
	}

	if(distDrag>distDragCrit){ // !! do no dragging actions if only click
	    if(trafficObjPicked){// dragged an object 
	      if(trafficObject.isActive){
		trafficObjs.deactivate(trafficObject); // detach obj from road
	      }

	      trafficObject.isDragged=true;
	      trafficObject.xPix=xPixUser;
	      trafficObject.yPix=yPixUser;
	    }
	    if(roadPicked){
	        dragRoad(xUser,yUser);
	    }

	}
    }


    // reset dragged distance to zero if mouse is up

    else{distDrag=0;} 
}