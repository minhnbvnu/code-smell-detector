function handleUp(){
		$(document).off( "mousemove",handleMove );
		$(document).off( "mouseup",handleUp );
	}