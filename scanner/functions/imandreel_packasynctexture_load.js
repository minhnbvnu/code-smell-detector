function imandreel_packasynctexture_load(array_buffer)
{
	if (array_buffer)
	{
		imandreel_packasynctexture_loaded(array_buffer, false);
		return;
	}


	var working_folder = mandreelAppWorkingFolder;
	if ( mandreelAppReadDataFromLocalHost )
		working_folder = mandreelAppLocalHost+"/"+mandreelAppWorkingFolder;
	var packdata_request = new XMLHttpRequest();
	var url = working_folder+_mandreel_currentPackTexture;

	packdata_request.open("GET", url, true);

	if("responseType" in packdata_request)
		packdata_request.responseType="arraybuffer";
	else
		packdata_request.overrideMimeType('text/plain; charset=x-user-defined');

	var last_loaded_size = 0;

	packdata_request.onreadystatechange = function()
	{
		if (packdata_request.readyState != 4) return;

		if (packdata_request.status == 200)
		{
			var buffer;
			if (packdata_request.responseType=="arraybuffer")
				buffer=packdata_request.response;
			else if (packdata_request.mozResponseArrayBuffer != null)
				buffer = packdata_request.mozResponseArrayBuffer;
			else
				buffer=packdata_request.response;

			imandreel_packasynctexture_loaded(buffer, true);
		}
		else
		{
			if ( mandreelAppStartStateFunc )
				mandreelAppStartStateFunc("error","can't load textureasync pack data");
		}
	}
	packdata_request.onprogress = function(e)
	{
		var delta_size = e.loaded - last_loaded_size;
		last_loaded_size = e.loaded;
		mandreel_loaded_packtexture_size+=delta_size;

		imandreel_update_load(delta_size,0);

		var percentage = ((100*mandreel_loaded_packtexture_size)/mandreel_total_packtexture_size)|0;

		if (percentage>100)
			percentage = 100;

		if ( mandreelAppStartStateFunc )
			mandreelAppStartStateFunc("loadingTextureAsyncPack",percentage);
	}

	packdata_request.send();

}