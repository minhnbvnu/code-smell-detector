function waterfall_mkcolor(db_value, waterfall_colors_arg)
{
	if(typeof waterfall_colors_arg === 'undefined') waterfall_colors_arg = waterfall_colors;
	if(db_value<waterfall_min_level) db_value=waterfall_min_level;
	if(db_value>waterfall_max_level) db_value=waterfall_max_level;
	full_scale=waterfall_max_level-waterfall_min_level;
	relative_value=db_value-waterfall_min_level;
	value_percent=relative_value/full_scale;
	percent_for_one_color=1/(waterfall_colors_arg.length-1);
	index=Math.floor(value_percent/percent_for_one_color);
	remain=(value_percent-percent_for_one_color*index)/percent_for_one_color;
	return color_between(waterfall_colors_arg[index+1],waterfall_colors_arg[index],remain);
}