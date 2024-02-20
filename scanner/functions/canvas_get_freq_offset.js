function canvas_get_freq_offset(relativeX)
{
	rel=(relativeX/canvases[0].clientWidth);
	return Math.round((bandwidth*rel)-(bandwidth/2));
}