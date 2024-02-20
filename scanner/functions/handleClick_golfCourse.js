function handleClick_golfCourse(event){
  
  var distMax=0.10*refSizePhys; // 0.05*smaller side in meters
  
  getMouseCoordinates(event); //=> xPixUser, yPixUser, xUser, yUser;

  if(true){
    console.log("\n\nitime=",itime," in handleClick_golfCourse: xPixUser=",
		formd0(xPixUser)," yPixUser=",formd0(yPixUser),
		" xUser=",formd(xUser),
		" yUser=",formd(yUser));
  }

  // [success, vehReturn, distMin_m, ivehReturn]
  var findResults=mainroad.findNearestVehTo(xUser,yUser); 
  if(findResults[0]){
    if(findResults[2]<distMax){
      vehPerturbed=findResults[1];
      vehPerturbed.canOvertakeGolf=!(vehPerturbed.canOvertakeGolf); // toggle
      vehPerturbed.dt_overtakeGolf=0;
      console.log("golfer group id ",vehPerturbed.id,
		  ((vehPerturbed.canOvertakeGolf) ? "can" : "cannot"),
		  " overtake");
    }
  }
}