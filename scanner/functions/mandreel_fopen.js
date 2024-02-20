function mandreel_fopen(sp)
  {
  var ptr_name = heap32[sp>>2];sp+=4;
  var ptr_flags = heap32[sp>>2];sp+=4;


	var name = get_string_from_ptr(ptr_name);
	var flags = get_string_from_ptr(ptr_flags);
	//dump('fopen\n');
	//dump(name);
	//dump('\n');
	//dump(flags);
	//dump('\n');

	var buffer;

	var full_name;

	name = name.toLowerCase();

	name = name.replace(/\\/g,"/");

	full_name	= g_mandreel_working_folder + name + g_mandreel_datafiles_sufix;


	buffer =mandreel_cache_files[name];

	if (buffer == null)
	{
	r_g0 = 0;
	return;
	}



	//dump('\nopening file ' + full_name + ' ' + buffer.byteLength + '\n');


	file_ids[current_file_id] = new create_file_id(buffer);

	var old_id = current_file_id;
	current_file_id++;

	r_g0 = old_id;
	//return old_id;
  }