function handleTouchEnd(evt) {
  //console.log("in handleTouchEnd(evt)");
  evt.preventDefault();

  getTouchCoordinates(evt); // xUser, yUser

  // do the action (=> see mouse section) !! also add actions to mouse sect

  finishDistortOrDropObject(xUser, yUser); 
  influenceClickedVehOrTL(xUser,yUser);
  //!! do not allow change of speedlimits if touch device

  drawSim();

}