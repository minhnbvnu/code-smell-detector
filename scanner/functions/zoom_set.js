function zoom_set(level)
{
	if(!(level>=0&&level<=zoom_levels.length-1)) return;
	level=parseInt(level);
	zoom_level = level;
	//zoom_center_rel=canvas_get_freq_offset(-canvases[0].offsetLeft+canvas_container.clientWidth/2); //zoom to screen center instead of demod envelope
	zoom_center_rel=demodulators[0].offset_frequency;
	zoom_center_where=0.5+(zoom_center_rel/bandwidth); //this is a kind of hack
	console.log(zoom_center_where, zoom_center_rel, -canvases[0].offsetLeft+canvas_container.clientWidth/2);
	resize_canvases(true);
	mkscale();
}