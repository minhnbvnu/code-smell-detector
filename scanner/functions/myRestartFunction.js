function myRestartFunction(){ 
  time=0;
  var i=0;

  for(var i=0; i<network.length; i++){

    var road=network[i];
    // remove all regular vehicles (leave obstacles and other special objects)
    // filter gives new array of filtered objects & leaves old unchanged
    // NOTICE: works with objects by reference, although locally created ("var")

    var newVehicles = road.veh.filter(selectNotRegularVeh);

    // add regular vehicles according to the given init density per lane

    road.veh=newVehicles;
    road.initRegularVehicles(density,fracTruck);
  }

  // reset all detectors (each detector knows which road it is at)

  if(!(typeof detectors === 'undefined')){
    for(var iDet=0; iDet<detectors.length; iDet++){
      detectors[iDet].reset();
    }
  }

   // activate thread if stopped

  if(isStopped){
    isStopped=false;
    document.getElementById("startStop").src="figs/buttonStop3_small.png";
    myRun=setInterval(main_loop, 1000/fps);
  }

}