function mouseUp(e){
	if(!moved) handleClick(e);	
	window.onmousemove = undefined;
	window.onmouseup = undefined;
}