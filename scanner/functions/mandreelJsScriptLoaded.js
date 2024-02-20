function mandreelJsScriptLoaded()
{
	if (mandreelJsScriptLoaded_loaded)
		return;

	if (typeof(mandreel_cache_files)=="undefined")
	{
		Mandreel_setTimeout(mandreelJsScriptLoaded,10);
		return;
	}

	mandreelJsScriptLoaded_loaded = true;

	if ( mandreelAppStartStateFunc )
		mandreelAppStartStateFunc("scriptLoaded","");

	if (mandreel_packfiledata_name)
	{

		mandreel_fs_load_binary(mandreel_packfiledata_name, mandreel_load_packfile);


	}
	else
	{
		mandreelCacheMandreelFat();
		imandreelJsScriptLoaded();
	}
}