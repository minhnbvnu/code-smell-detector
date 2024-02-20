function getMouseCoordinates(event){// called if mouse moved or down

  // always use canvas-related pixel and physical coordinates

  var rect = canvas.getBoundingClientRect();
  var xPixLeft=rect.left; // left-upper corner of the canvas 
  var yPixTop=rect.top;   // in browser reference system
  xPixUser= event.clientX-xPixLeft; //pixel coords in canvas reference
  yPixUser= event.clientY-yPixTop; 
  xUser=xPixUser/scale;   //scale from main js onramp.js etc
  yUser=-yPixUser/scale;   //scale from main js onramp.js etc (! factor -1)

  if(false){
	console.log("getMouseCoordinates: xUser=",xUser," yUser=",yUser);
  }
}