function handleMouseUp(evt) {
  if(false){console.log("\n\nitime=",itime," in handleMouseUp(evt):",
			" speedlBoxActive=",speedlBoxActive);}

  getMouseCoordinates(evt); // => xUser, yUser, xPixUser, yPixUser
  finishDistortOrDropObject(xUser, yUser); 

  drawSim();
  if(false){console.log("  end handleMouseUp(evt):",
			" speedlBoxActive=",speedlBoxActive);}

}