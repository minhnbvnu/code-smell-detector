function canvas_mousewheel(evt)
{
	if(!waterfall_setup_done) return;
	//var i=Math.abs(evt.wheelDelta);
	//var dir=(i/evt.wheelDelta)<0;
	//console.log(evt);
	var relativeX=(evt.offsetX)?evt.offsetX:evt.layerX;
	var dir=(evt.deltaY/Math.abs(evt.deltaY))>0;
	//console.log(dir);
	//i/=120;
	/*while (i--)*/ zoom_step(dir, relativeX, zoom_center_where_calc(evt.pageX));
	evt.preventDefault();
	//evt.returnValue = false; //disable scrollbar move
}