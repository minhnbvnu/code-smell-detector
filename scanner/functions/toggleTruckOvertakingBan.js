function toggleTruckOvertakingBan(){
    banButtonClicked=true; // everything needs to be redrawn
    if(banIsActive){
	banIsActive=false;
	document.getElementById('overtakingBan').innerHTML
	    ="Enforce Truck Overtaking Ban";
   }
    else{
	banIsActive=true;
	document.getElementById('overtakingBan').innerHTML
	    ="Lift Truck Overtaking Ban";
    }
    updateModelsUphill();
    console.log("control_gui.toggleTruckOvertakingBan: LCModelTruckUphill=",
		LCModelTruckUphill);
 
}