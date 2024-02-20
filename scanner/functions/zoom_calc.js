function zoom_calc()
{
	winsize=canvas_container.clientWidth;
	var canvases_new_width=winsize*zoom_levels[zoom_level];
	zoom_offset_px=-((canvases_new_width*(0.5+zoom_center_rel/bandwidth))-(winsize*zoom_center_where));
	if(zoom_offset_px>0) zoom_offset_px=0;
	if(zoom_offset_px<winsize-canvases_new_width)
		zoom_offset_px=winsize-canvases_new_width;
	//console.log("zoom_calc || zopx:"+zoom_offset_px.toString()+ " maxoff:"+(winsize-canvases_new_width).toString()+" relval:"+(0.5+zoom_center_rel/bandwidth).toString() );
}