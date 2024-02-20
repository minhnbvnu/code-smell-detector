function mandreel_fs_get_url(file_name, callback)
{
	if (mandreel_indexedDB.db)
	{
		callback(null);
		return;
	}


	if (g_mandreel_fs == null)
	{
		callback(null);
		return;
	}

	g_mandreel_fs.root.getFile(file_name, {}, function(fileEntry) {

	fileEntry.getMetadata(function(metaData){
	var my_seconds = metaData.modificationTime.getTime()/1000;

	if (g_mandreel_timestamp_fs>my_seconds)
	{
		callback(null);
	}
	else
	{
		//alert('mandreel_fscachefile2');


		if (Mandreel_window.localStorage.getItem(mandreel_fs_get_key(file_name)) != null)
			callback(fileEntry.toURL());
		else
			callback(null);

	}


		}, MandreelFsErrorHandler);


  }, function(error) {callback(null);});

	 return;

}