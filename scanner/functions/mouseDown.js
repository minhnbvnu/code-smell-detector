function mouseDown(e){
	e.preventDefault();
	moved=false;	
	dragMouseX = e.clientX;	
	dragMouseY = e.clientY;
	window.onmousemove = function(e){mouseMove(e)};
	window.onmouseup = function(e){mouseUp(e)};
}