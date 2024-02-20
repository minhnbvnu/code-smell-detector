function mandreel_load_compressed_js(code_js)
{
	if (code_js)
	{
		mandreelDecompressJSReady(code_js,false);
		return;
	}
	 var xmlhttp_get = new XMLHttpRequest();

	 var url = mandreelAppMandreelJs + ".lzma";
	 if ( mandreelAppReadMandreelJsFromLocalHost )
		url = mandreelAppLocalHost+"/"+url;

	 xmlhttp_get.open('GET',url);


	if("responseType" in xmlhttp_get)
		xmlhttp_get.responseType="arraybuffer";
	else
		xmlhttp_get.overrideMimeType('text/plain; charset=x-user-defined');

	var last_loaded_size = 0;

	xmlhttp_get.onreadystatechange = function()
	{
		if (xmlhttp_get.readyState==4)
		{
			if (xmlhttp_get.status==200 || xmlhttp_get.status==0)
			{

				var inStream = {
				  data: new Uint8Array(xmlhttp_get.response),
				  offset: 0,
				  readByte: function(){
					return this.data[this.offset ++];
				  }
				};

				var outStream = {
				  data: new String(""),
				  offset: 0,
				  binary_mode : false,
				  writeByte: function(value){
					this.data+=String.fromCharCode(value);
				  }
				};


				var result = LZMA.decompress2(inStream,inStream,outStream,null);
				if (result == null)
					mandreelDecompressJSReady(outStream.data,true);
				else
					Mandreel_setTimeout(mandreelNextDecompressJS,10,result);
			}
			else
			{
				alert('error ' + xmlhttp_get.status);
			}
		}

	}

	xmlhttp_get.onprogress = function(e)
	{
		var delta_size = e.loaded - last_loaded_size;
		last_loaded_size = e.loaded;

		var percentage = ((100*e.loaded)/e.total)|0;

		mandreel_jslzma_size = e.total;

		imandreel_update_load(delta_size,0);

		if (percentage>100)
			percentage = 100;

		if ( mandreelAppStartStateFunc )
			mandreelAppStartStateFunc("loadingScriptUpdate",percentage);
	}

	xmlhttp_get.send();

}