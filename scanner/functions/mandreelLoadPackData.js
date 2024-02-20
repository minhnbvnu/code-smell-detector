function mandreelLoadPackData(data, save_pack)
{
	var files = mandreelFatData.split('\n');

	var current_dir = '';
	var current_offset = 0;

	if (save_pack)
		mandreel_fs_saveFile(mandreel_packfiledata_name,data);


	for (var i=0;i<files.length;++i)
	{
		var file_data = files[i].split(',');

		if (file_data[0] == 'dir')
		{
			current_dir = file_data[1];
			//current_dir = current_dir.substr(0,current_dir.lengh-1);
		}
		else if (file_data[0] == 'file')
		{
			var file_name = current_dir + file_data[1];
			file_name = mandreel_chanka_fixfile(file_name) ;
			//dump('new file ' + file_name + ' ' + current_offset);
			//dump(file_name);
			var file_size = parseInt(file_data[2]);

			var my_array = new ArrayBuffer(file_size);

			var my_bytes = new Uint8Array(my_array);

			var data_bytes = new Uint8Array(data,current_offset,file_size);

			my_bytes.set(data_bytes);

			mandreel_cache_files[file_name] = my_array;


			current_offset+=file_size;


		}
	}



	g_mandreel_datafiles_sufix = '';
	mandreelCacheMandreelFat();

	imandreelJsScriptLoaded();
}