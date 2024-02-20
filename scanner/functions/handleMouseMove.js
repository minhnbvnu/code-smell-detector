function handleMouseMove(event){
  //console.log("in handleMouseMove(evt): mousedown=",mousedown);
  getMouseCoordinates(event); //=> xUser,yUser;
  doDragging(xUser,yUser,xUserDown,yUserDown);
  drawSim(); // to be able to move objects during stopped simulation
}