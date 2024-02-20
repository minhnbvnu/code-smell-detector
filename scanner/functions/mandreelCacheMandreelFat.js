function mandreelCacheMandreelFat()
{
	var array_mandreel_fat = new ArrayBuffer(mandreelFatData.length+1);


	{
		var j;
		var len = mandreelFatData.length;
		var data_char;

		var my_bytes = new Uint8Array(array_mandreel_fat);

		for(j = 0; j < len; j++)
		{
			data_char = mandreelFatData.charCodeAt(j);

			my_bytes[j] = data_char;
		}
		my_bytes[j] = 0;
	}


	mandreel_cache_files['mandreel.fat'] = array_mandreel_fat;
}