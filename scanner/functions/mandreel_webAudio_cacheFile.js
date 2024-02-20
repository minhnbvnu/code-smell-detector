function mandreel_webAudio_cacheFile(fileName, callback)
{
	if (!g_mandreel_fs)
	{
		mandreel_webAudio_reloadfile(fileName, callback);

		return;
	}
	fileName = fileName.toLowerCase();

	fileName = fileName.replace(/\\/g,"/");

	if (fileName[0] == '/')
		fileName = fileName.substring(1);

	dump('chanka name ' + fileName);

	g_mandreel_fs.root.getFile(fileName, {}, function(fileEntry) {

	fileEntry.getMetadata(function(metaData){
	var my_seconds = metaData.modificationTime.getTime()/1000;

	if (g_mandreel_timestamp_fs>my_seconds)
	{
		dump('mandreel_webAudio_cacheFile1 ');
		fileEntry.remove(function() {
				mandreel_webAudio_reloadfile(fileName, function(response) { callback(response); if (response) mandreel_webaudio_saveFile(fileName, response); } );
			}, function(e) { dump('error 1 mandreel_webAudio_cacheFile ' + fileName);MandreelFsErrorHandler(e); mandreel_webAudio_reloadfile(fileName, function(response) { callback(response); if (response) mandreel_webaudio_saveFile(fileName, response); } );});

	}
	else
	{
		//alert('mandreel_fscachefile2');
		dump('mandreel_webAudio_cacheFile2');
		mandreel_webaudio_loadFile(fileName, function(response) { callback(response);  } ,
		function() {
				mandreel_webAudio_reloadfile(fileName, function(response) { callback(response); if (response) mandreel_webaudio_saveFile(fileName, response); } );
			}
		);



	}


		}, function(e) { dump('error 2 mandreel_webAudio_cacheFile ' + fileName);MandreelFsErrorHandler(e) });


  }, function(error) {dump('mandreel_webAudio_cacheFile3');	mandreel_webAudio_reloadfile(fileName, function(response) { callback(response); if (response) mandreel_webaudio_saveFile(fileName, response); });});
}