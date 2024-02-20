function zoom_step(out, where, onscreen)
{
	if((out&&zoom_level==0)||(!out&&zoom_level>=zoom_levels_count-1)) return;
	if(out) --zoom_level;
	else ++zoom_level;

	zoom_center_rel=canvas_get_freq_offset(where);
	//console.log("zoom_step || zlevel: "+zoom_level.toString()+" zlevel_val: "+zoom_levels[zoom_level].toString()+" zoom_center_rel: "+zoom_center_rel.toString());
	zoom_center_where=onscreen;
	//console.log(zoom_center_where, zoom_center_rel, where);
	resize_canvases(true);
	mkscale();
}