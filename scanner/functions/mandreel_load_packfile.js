function mandreel_load_packfile(array_buffer)
{
	if (array_buffer)
	{
		mandreelLoadPackData(array_buffer,false);
		return;
	}

	var working_folder = mandreelAppWorkingFolder;
	if ( mandreelAppReadDataFromLocalHost )
		working_folder = mandreelAppLocalHost+"/"+mandreelAppWorkingFolder;
	var packdata_request = new XMLHttpRequest();
	var url = working_folder+mandreel_packfiledata_name;

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

			if (mandreel_packfiledata_compressed)
			{
				var inStream = {
				  data: new Uint8Array(buffer),
				  offset: 0,
				  readByte: function(){
					return this.data[this.offset ++];
				  }
				};

				var outStream = {
				  data: null,
				  offset: 0,
				  binary_mode : true,
				  writeByte: function(value){
					this.data[this.offset ++] = value;
				  }
				};


				var result = LZMA.decompress2(inStream,inStream,outStream,null);

				if (result == null)
					mandreelLoadPackData(outStream.arrayBuffer,true);
				else
					Mandreel_setTimeout(mandreelNextDecompress,10,result);
			}
			else
				mandreelLoadPackData(buffer,true);
		}
		else
		{
			if ( mandreelAppStartStateFunc )
				mandreelAppStartStateFunc("error","can't load packfile data");
		}
	}
	packdata_request.onprogress = function(e)
	{
		var delta_size = e.loaded - last_loaded_size;
		last_loaded_size = e.loaded;
		var percentage = ((100*e.loaded)/mandreel_packfiledata_size)|0;


		imandreel_update_load(delta_size,0);

		if (percentage>100)
			percentage = 100;

		if ( mandreelAppStartStateFunc )
			mandreelAppStartStateFunc("loadingData",percentage);
	}

	packdata_request.send();
}