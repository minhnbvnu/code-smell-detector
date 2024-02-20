function subtractOneLane(){ 
  if(mainroad.nLanes>nLanesMin){
	userCanvasManip=true;  // causes drawing background, resampling road
	mainroad.subtractOneLane(); // changes mainroad.nLanes
	nLanes_main--;             // needed for defining geometry
	roadImg1=roadImgs1[mainroad.nLanes-1];
	roadImg2=roadImgs2[mainroad.nLanes-1];

     // only ramp adapts to nLanes; only needed if ramp!==undefined 

    if((typeof ramp!=="undefined")&&userCanDistortRoads){
      iramp=1;
      network[iramp].gridTrajectories(trajNet_x[iramp], trajNet_y[iramp]);
    }
  }


  
  else{console.log("subtractOneLane(): minimum of ",nLanesMax,
		     " lanes reached!");}

  //console.log("subtractOneLane: mainroad.nLanes=",mainroad.nLanes);

  if(mainroad.nLanes===nLanesMin){
	document.getElementById("laneMinusDiv").style.visibility="hidden";
  }
  if(mainroad.nLanes<nLanesMax){
	//console.log("in setting lanePlus visible!!!");
        document.getElementById("lanePlusDiv").style.visibility="visible";
  }

}