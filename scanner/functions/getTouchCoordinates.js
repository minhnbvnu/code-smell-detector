function getTouchCoordinates(event){
    var touch = event.changedTouches[0]; // multitouch: several components

    var rect = canvas.getBoundingClientRect();
    var xPixLeft=rect.left; // left-upper corner of the canvas 
    var yPixTop=rect.top;   // in browser reference system
    xPixUser= touch.clientX-xPixLeft; //pixel coords in canvas reference
    yPixUser= touch.clientY-yPixTop; 
    xUser=xPixUser/scale;   //scale from main js onramp.js etc
    yUser=-yPixUser/scale;   //scale from main js onramp.js etc

    if(false){
	console.log("getTouchCoordinates: xUser=",xUser," yUser=",yUser);
    }

}