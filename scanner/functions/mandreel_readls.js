function mandreel_readls(sp)
  {
	var ptr_name = heap32[sp>>2];sp+=4;
	var data_dst = heap32[sp>>2];sp+=4;
	var data_len = heap32[sp>>2];sp+=4;

	var key = get_string_from_ptr(ptr_name);

	var my_localStorage = mandreel_getlocalstorage();

	var value = my_localStorage.getItem(key);

	var data = JSON.parse(value);


	for (var i=0;i<data_len;++i)
	{
		heapU8[data_dst+i] = data[i];
	}

	r_g0 =  data_len;
	return;

}