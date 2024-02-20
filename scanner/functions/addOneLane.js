function addOneLane(){ 
  if(mainroad.nLanes<nLanesMax){
	userCanvasManip=true; // causes drawing background, resampling road
	mainroad.addOneLane();     // changes mainroad.nLanes
	nLanes_main++;             // needed for defining geometry
	roadImg1=roadImgs1[mainroad.nLanes-1];
	roadImg2=roadImgs2[mainroad.nLanes-1];

    // only ramp adapts to nLanes; only needed if ramp!==undefined 
    // onramp=network[1]
    if((typeof ramp!=="undefined")&&userCanDistortRoads){
      iramp=1;
      network[iramp].gridTrajectories(trajNet_x[iramp], trajNet_y[iramp]);
    }
  }



  
  else{console.log("addOneLane(): maximum of ",nLanesMax,
		     " lanes reached!");}

  console.log("addOneLane: mainroad.nLanes=",mainroad.nLanes);
  if(mainroad.nLanes===nLanesMax){
	document.getElementById("lanePlusDiv").style.visibility="hidden";
  }
  if(mainroad.nLanes>nLanesMin){
        document.getElementById("laneMinusDiv").style.visibility="visible";
  }
}