function updateSim(){
//#################################################################


  // (1) update times

  time +=dt; // dt depends on timewarp slider (fps=const)
  itime++;
  isSmartphone=mqSmartphone();

  // (2) transfer effects from slider interaction and mandatory regions
  // to the vehicles and models

  mainroad.updateTruckFrac(fracTruck, fracTruckToleratedMismatch);
  mainroad.updateModelsOfAllVehicles(longModelCar,longModelTruck,
				       LCModelCar,LCModelTruck,
				       LCModelMandatory);

  // transfer slider actions to Uphill LC models if no ban
  // (fixed models if ban)
  // actual transfer to the vehicles in mainroad.setLCModelsInRange 
  
  updateModelsUphill();
  
  if(false){
  //if(itime%20==0){
    console.log("\nLCModelCarUphill.bBiasRight=",LCModelCarUphill.bBiasRight,
		" LCModelCar.bBiasRight=",LCModelCar.bBiasRight);
    console.log("LCModelTruckUphill.bBiasRight=",LCModelTruckUphill.bBiasRight,
		" LCModelTruck.bBiasRight=",LCModelTruck.bBiasRight);
  }
    mainroad.setCFModelsInRange(uBeginUp,uEndUp,
				 longModelCarUphill,longModelTruckUphill);
    mainroad.setLCModelsInRange(uBeginBan,uEndUp,
				 LCModelCarUphill,LCModelTruckUphill);

  // (2a) update moveable speed limits

  for(var i=0; i<network.length; i++){
    network[i].updateSpeedlimits(trafficObjs);
  }

    // do central simulation update of vehicles

    mainroad.updateLastLCtimes(dt);
    mainroad.calcAccelerations();  
    mainroad.changeLanes();         
    mainroad.updateSpeedPositions();
    mainroad.updateBCdown();
    mainroad.updateBCup(qIn,dt); // argument=total inflow
	

    if(true){
	for (var i=0; i<mainroad.nveh; i++){
	    if(mainroad.veh[i].speed<0){
		console.log(" speed "+mainroad.veh[i].speed
			    +" of mainroad vehicle "
			    +i+" is negative!");
	    }
	}
    }


   if(userCanDropObjects&&(!isSmartphone)&&(!trafficObjPicked)){
    trafficObjs.zoomBack();
  }

  // (6) debug output
  
  if(false){
  //if(itime%20==0){
    //mainroad.writeTrucksLC();
    mainroad.writeVehicleLCModels();
  }

  
}