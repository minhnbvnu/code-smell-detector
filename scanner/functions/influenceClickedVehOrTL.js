function influenceClickedVehOrTL(xUser,yUser){
  //console.log("\n\nitime=",itime," onclick: in influenceClickedVehOrTL");
  //console.log("yUser=",yUser," yPixUser=",yPixUser);
  if(distDrag<distDragCrit){ // only do actions if click, no drag

 
    var success=trafficObjs.changeTrafficLightByUser(xPixUser,yPixUser);

    // only slowdown clicked vehicles if 
    // (i) TL switch no success, (ii) only insignificant drag ;  
    // (iii) nearest selected vehicle is nearer than distDragCrit 
    // distDragCrit controls both (ii) and (iii)
    // Note: dragging actions with converse filter by onmousedown,-move,-up ops

    if(!success){
      slowdownVehNearestTo(xUser,yUser,distDragCrit);

      console.log("  end influenceClickedVehOrTL: called",
		  " slowdownVehNearestTo");

    }

  }


  // reset drag distance recorder

  distDrag=0;

}