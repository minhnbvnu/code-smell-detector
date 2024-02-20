function myMouseMoveHandler(e){ 
    isOutside=false;
    //xMouseCanvas=e.clientX - canvas.offsetLeft;
    //yMouseCanvas=e.clientY - canvas.offsetTop;
    xMouseCanvas=e.offsetX;
    yMouseCanvas=e.offsetY;
    if(false){
	console.log("xMouseCanvas,yMouseCanvas=(",
		    xMouseCanvas,",",yMouseCanvas,")",
		    " canvas.offsetTop=",canvas.offsetTop,
		    " canvas.offsetY=",canvas.offsetY,
		    " e.offsetY=",e.offsetY);
    }
}