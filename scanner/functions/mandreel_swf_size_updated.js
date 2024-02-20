function mandreel_swf_size_updated(str)
{
	var params = str.split(',');
	if ( mandreel_swf_size == 0 )
	{
		mandreel_swf_last_loaded_size = 0;
	}
	mandreel_swf_size = parseInt(params[0]);
	var loaded = parseInt(params[1]);
	var delta_size = loaded - mandreel_swf_last_loaded_size;
	mandreel_swf_last_loaded_size = loaded;

	var percentage = ((100*loaded)/mandreel_swf_size)|0;
	if (percentage>100)
		percentage = 100;

	if ( mandreelAppStartStateFunc )
		mandreelAppStartStateFunc("loadingScriptUpdate",percentage);

	imandreel_update_load(delta_size,0);
}