function waterfallColorsAuto()
{
	e("openwebrx-waterfall-color-min").value=(waterfall_measure_minmax_min-waterfall_auto_level_margin[0]).toString();
	e("openwebrx-waterfall-color-max").value=(waterfall_measure_minmax_max+waterfall_auto_level_margin[1]).toString();
	updateWaterfallColors(0);
}