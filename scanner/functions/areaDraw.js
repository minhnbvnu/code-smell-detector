function areaDraw(pathCtx, mouseX, mouseY, redraw){

	//clear any previous drawings and restore image
	pathCtx.clearRect(0, 0, canvas.width, canvas.height);
	
	//determines if we need to redraw image after clearing canvas
	if(redraw){
		pathCtx.drawImage(holderCanvas, 0, 0);
	}
	pathCtx.beginPath();
	
	//calculate width and height of rectangle based on start posisions and current positions
	var width = mouseX-mouseX_start;
	var height = mouseY-mouseY_start;
	
	//draw current rectangle
	pathCtx.rect(mouseX_start,mouseY_start,width,height);
	pathCtx.strokeStyle = paintColor;
    pathCtx.fillStyle = paintColor;
	pathCtx.lineWidth = 10;
	pathCtx.stroke();
	pathCtx.fill();
}