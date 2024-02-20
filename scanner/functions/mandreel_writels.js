function mandreel_writels(sp)
  {
	var ptr_name = heap32[sp>>2];sp+=4;
	var data_src = heap32[sp>>2];sp+=4;
	var data_len = heap32[sp>>2];sp+=4;

	var key = get_string_from_ptr(ptr_name);



	var data = new Uint8Array(heap,data_src,data_len);

	var value = JSON.stringify(data);

	var my_localStorage = mandreel_getlocalstorage();

	try
	{
		my_localStorage.setItem(key, value);
	} catch(e)
	{
		dump('error saving ' + key);
		dump(e.message);
		r_g0 =  0;
		return;
	}

	try
	{
		my_localStorage.setItem(key + '_size', data_len);
	} catch(e)
	{
		dump('error saving ' + key);
		dump(e.message);
		r_g0 =  0;
		return;
	}


	r_g0 =  data_len;
	return;

}