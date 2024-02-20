function mandreel_openls(sp)
  {
	var ptr_name = heap32[sp>>2];sp+=4;

	var key = get_string_from_ptr(ptr_name);

	var my_localStorage = mandreel_getlocalstorage();

	var value = my_localStorage.getItem(key);

	if (value == null)
	{
		r_g0 = -1;
		return;
	}


	var length = my_localStorage.getItem(key + '_size');

	if (length == null)
	{
		r_g0 = -1;
		return;
	}




	dump('mandreel_openls ' + key + ' return ' + length);


	r_g0 = parseInt(length);



	return;

  }