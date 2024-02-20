function get_visible_freq_range()
{
	out={};
	fcalc=function(x) { return Math.round(((-zoom_offset_px+x)/canvases[0].clientWidth)*bandwidth)+(center_freq-bandwidth/2); }
	out.start=fcalc(0);
	out.center=fcalc(canvas_container.clientWidth/2);
	out.end=fcalc(canvas_container.clientWidth);
	out.bw=out.end-out.start;
	out.hps=out.bw/canvas_container.clientWidth;
	return out;
}