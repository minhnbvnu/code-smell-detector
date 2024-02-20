function waterfall_measure_minmax_do(what)
{
	waterfall_measure_minmax_min=Math.min(waterfall_measure_minmax_min,Math.min.apply(Math,what));
	waterfall_measure_minmax_max=Math.max(waterfall_measure_minmax_max,Math.max.apply(Math,what));
}