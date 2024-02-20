function handleDependencies(){
    //console.log("handleDependencies: scenarioString=",scenarioString);

  if(scenarioString==="OnRamp"){

        // update end-ramp obstacle and ramp->main offset

    ramp.veh[0].u=ramp.roadLen-0.6*taperLen; // shift end-obstacle

        // search mainroad u-point nearest to merging point of onramp

    var uMainNearest=ramp.getNearestUof(mainroad,ramp.roadLen-mergeLen);
    mainRampOffset=uMainNearest-(ramp.roadLen-mergeLen);
    if(true){
      console.log("after handleDependencies: onramp: ",
		  " ramp.veh[0].u=",ramp.veh[0].u,
		  " mainRampOffset=",mainRampOffset);
    }
  }

  else if(scenarioString==="OffRamp"){

        // search mainroad u-point nearest to diverging point of onramp
        // and update offrampInfo
    var uMainNearest=ramp.getNearestUof(mainroad,divergeLen);
    mainRampOffset=uMainNearest-divergeLen;
    rampLastExits=[mainRampOffset+divergeLen];
    mainroad.setOfframpInfo(offrampIDs,offrampLastExits,offrampToRight);
    console.log("after handleDependencies: offramp: offrampLastExits=",offrampLastExits);
  }

  else if(scenarioString==="Deviation"){
	if(false){
	  console.log("before canvas_gui.handleDependencies for \"Deviation\"",
		    "\n   umainMerge=",umainMerge,
		    "\n   umainDiverge=",umainDiverge
		   );
	}

       // update (i)  the two offsets, (ii) offrampinfo (see routing.js), 
       // (iii) end-deviation obstacle at onramp 
       // described by umainDiverge,umainMerge

	umainDiverge=ramp.getNearestUof(mainroad,lrampDev)-lrampDev;
	umainMerge=ramp.getNearestUof(mainroad,
					   ramp.roadLen-lrampDev);
	offrampLastExits=[umainDiverge+lrampDev];
	mainroad.setOfframpInfo(offrampIDs,offrampLastExits,offrampToRight);

	ramp.veh[0].u=ramp.roadLen-0.6*taperLen;

	if(false){
	console.log("after canvas_gui.handleDependencies for \"Deviation\"",
		    "\n   umainMerge=",umainMerge,
		    "\n   umainDiverge=",umainDiverge
		   );
	}
  }

}