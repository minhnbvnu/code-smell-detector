function mkzoomlevels()
{
	zoom_levels=[1];
	maxc=get_zoom_coeff_from_hps(zoom_max_level_hps);
	if(maxc<1) return;
	// logarithmic interpolation
	zoom_ratio = Math.pow(maxc, 1/zoom_levels_count);
	for(i=1;i<zoom_levels_count;i++)
		zoom_levels.push(Math.pow(zoom_ratio, i));
}