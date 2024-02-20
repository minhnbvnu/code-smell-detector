function slowdownVehNearestTo(xUser,yUser,distCrit_m){

  var speedReduceFactor=0.5;
  var vehPerturbed;

  var distMin_m=1e6;
  var iRoad=-1;
  for (var i=0; i<network.length; i++){

    // [success,vehReturn,distMin_m, ivehReturn];
    var findResults=network[i].findNearestVehTo(xUser,yUser);

    if(findResults[0]){
      if(findResults[2]<distMin_m){
	iRoad=i;
	distMin_m=findResults[2];
	vehPerturbed=findResults[1];
      }
    }

    if(false){
      console.log("in slowdownVehNearestTo: i=",i," findResults[2]=",
		  findResults[2]," success=",findResults[0]);
    }

  }

  if((iRoad==-1)||(distMin_m>distCrit_m)){ // no success
    console.log("influenceVehNearestTo: no suitable vehicle found!");
    return;
  }
       

  if(vehPerturbed.isRegularVeh()){  // neither TL nor obstacle
    vehPerturbed.id=idPerturbed;  // to distinguish it by color
    vehPerturbed.speed *= speedReduceFactor;
    idPerturbed++; if(idPerturbed===50){idPerturbed=10;}
  }
}