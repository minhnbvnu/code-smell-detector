function scale_offset_freq_from_px(x, visible_range)
{
	if(typeof visible_range === "undefined") visible_range=get_visible_freq_range();
	return (visible_range.start+visible_range.bw*(x/canvas_container.clientWidth))-center_freq;
}