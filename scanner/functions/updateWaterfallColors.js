function updateWaterfallColors(which)
{
	wfmax=e("openwebrx-waterfall-color-max");
	wfmin=e("openwebrx-waterfall-color-min");
	if(parseInt(wfmin.value)>=parseInt(wfmax.value))
	{
			if(!which) wfmin.value=(parseInt(wfmax.value)-1).toString();
			else wfmax.value=(parseInt(wfmin.value)+1).toString();
	}
	waterfall_min_level=parseInt(wfmin.value);
	waterfall_max_level=parseInt(wfmax.value);
}