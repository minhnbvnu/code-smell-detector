function waterfall_add_queue(what)
{
	if(waterfall_measure_minmax) waterfall_measure_minmax_do(what);
	if(waterfall_measure_minmax_now) { waterfall_measure_minmax_do(what); waterfall_measure_minmax_now=false; waterfallColorsAuto(); }
	waterfall_queue.push(what);
}