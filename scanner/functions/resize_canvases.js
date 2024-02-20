function resize_canvases(zoom)
{
	if(typeof zoom == "undefined") zoom=false;
	if(!zoom) mkzoomlevels();
	zoom_calc();
	new_width=(canvas_container.clientWidth*zoom_levels[zoom_level]).toString()+"px";
	var zoom_value=zoom_offset_px.toString()+"px";
	canvases.forEach(function(p)
	{
		p.style.width=new_width;
		p.style.left=zoom_value;
	});
	canvas_phantom.style.width=new_width;
	canvas_phantom.style.left=zoom_value;
}