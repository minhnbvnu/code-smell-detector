function pickRoadOrObject(xUser,yUser){

  if(typeof userCanDistortRoads==='undefined'){userCanDistortRoads=false;}
  //console.log("itime=",itime," in pickRoadOrObject(canvas_gui):");
  
  /* priorities (at most one action initiated at a given time):

    (1) pick/drag trafficObject on a road or to the depot. 
    (2) test for a road section nearby

    later stages not here but at onmousemove or onmouseup (onclick) callbacks
    (3) drag on road less than crit and then mouse up => click: slow down road
    (4) drag on road more than crit: roadPicked=true

  */

  if(true){
    console.log("itime=",itime," in pickRoadOrObject: xUser=",
		formd0(xUser),
		" yUser=",formd0(yUser));
  }

  //==============================================================
  // (1) pick/select an active or passive trafficObject
  // trafficObjs.pickObject returns [successFlag, thePickedObj]
  //==============================================================

  if(!(typeof trafficObjs === 'undefined')){ // just check for scenarios w/o
    var distCrit_m=20; //[m] !! make it rather larger  
    var pickResults=trafficObjs.pickObject(xPixUser, yPixUser, 
				      distCrit_m*scale);
    console.log("  pickRoadOrObject (1): test for object to be picked: pickResults=",pickResults);
   if(pickResults[0]){
      trafficObject=pickResults[1];
      trafficObjPicked=true;
      roadPicked=false;
      if(false){
        console.log("  end pickRoadOrObject: success! picked trafficObject id=",
		    trafficObject.id," type ",
		    trafficObject.type,
		    " isActive=",trafficObject.isActive,
		    " inDepot=",trafficObject.inDepot," end");
      }
      return;
    }
    //else console.log("  pickRoadOrObject (1): no trafficObject found");
  }

  //==============================================================
  // (2) test for a road section nearby
  // road.testCRG returns [success,distmin_m,dx_m, dy_m]
  // success only given if distmin_m < some road-internally defined distCrit_m
  //==============================================================

  if(userCanDistortRoads){
    var distmin_m=1e6;
    var success=false;
    var iRoadNearest=-1;
    draggedRoad="null";

    for(var i=0; i<network.length; i++){
      var pickResults=network[i].testCRG(xUser, yUser);
      if(pickResults[0]){
	success=true;
	if(pickResults[1]<distmin_m){
	  iRoadNearest=i;
	  distmin_m=pickResults[1];
	}
      }
    }

    if(success){
      draggedRoad=network[iRoadNearest];
      console.log("  pickRoadOrObject (2): success!",
		  " picked road with roadID=",draggedRoad.roadID,
		  "  for dragging as soon as distDrag>distDragCrit");
      trafficObjPicked=false;
      roadPicked=true;
    }
    else{
      console.log("  pickRoadOrObject (2): no nearby road found");
    }
  }
  else{
    console.log("  pickRoadOrObject (2): user cannot distort roads, so n.a.");
    if(false){
      console.log("  end pickRoadOrObject: found no suitable action!",
	        " [notice: clicking callback is separate from this]");
    }
  }



}