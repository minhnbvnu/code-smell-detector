function zoomToBox(xmin,xmax,ymin,ymax){
	var xmid=(xmin+xmax)/2;
	var ymid=(ymin+ymax)/2;
	var x=(xmid+grChipOffsetX)/grChipSize*600;
	var y=600-(ymid-grChipOffsetY)/grChipSize*600;
	// Zoom to fill 80% of the window with the selection
	var fillfactor=0.80;
	var dx=xmax-xmin;
	var dy=ymax-ymin;
	if (dx < 1) dx=1;
	if (dy < 1) dy=1;
	var zx=(800/600)*fillfactor*grChipSize/dx;
	var zy=fillfactor*grChipSize/dy;
	var zoom=Math.min(zx,zy);
	if (zoom < 1) {
		zoom = 1;
	}
	if (zoom > grMaxZoom) {
		zoom = grMaxZoom;
	}
	moveHere([x,y,zoom]);
}