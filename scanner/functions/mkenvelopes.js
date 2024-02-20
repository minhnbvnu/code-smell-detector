function mkenvelopes(visible_range) //called from mkscale
{
	scale_ctx.clearRect(0,0,scale_ctx.canvas.width,22); //clear the upper part of the canvas (where filter envelopes reside)
	for (var i=0;i<demodulators.length;i++)
	{
		demodulators[i].envelope.draw(visible_range);
	}
    if(demodulators.length) secondary_demod_waterfall_set_zoom(demodulators[0].low_cut, demodulators[0].high_cut);
}