function mandreel_fs_load_text(file_name, callback)
 {

	if (mandreel_indexedDB.db)
	{
		mandreel_indexedDB.load(file_name,callback);
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
		dump('mandreel_fscachefile1');
		Mandreel_window.localStorage.removeItem(mandreel_fs_get_key(file_name));
		fileEntry.remove(function() {
				callback(null);
			}, MandreelFsErrorHandler);

	}
	else
	{
		//alert('mandreel_fscachefile2');
		dump('mandreel_fscachefile2 ' + my_seconds);

		fileEntry.file(function(file) {

				var reader = new FileReader();


			   reader.onloadend = function(e) {


				   if (this.result.length && Mandreel_window.localStorage.getItem(mandreel_fs_get_key(file_name)) != null)
				   {
						dump('mandreel_fs_loadFile ' + file_name);
						callback(this.result);
					}
					else
						callback(null);

			   };


				 reader.readAsText(file);


			}, MandreelFsErrorHandler);

	}


		}, MandreelFsErrorHandler);


  }, function(error) {dump('mandreel_fscachefile3');	callback(null);});

	 return;
 }