function findNodeNumber(x,y){
	var ctx = hitbuffer.getContext('2d');
	var pixels = ctx.getImageData(x*grCanvasSize/600, y*grCanvasSize/600, 2, 2).data;
	if(pixels[0]==0) return -1;
	var high = pixels[0]>>4;
	var mid = pixels[1]>>4;
	var low = pixels[2]>>4;
	return (high<<8)+(mid<<4)+low;
}