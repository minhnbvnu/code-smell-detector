function mandreel_removels(sp)
 {
 var ptr_name_a = heap32[sp>>2];sp+=4;
 var key_a = get_string_from_ptr(ptr_name_a);

 var my_localStorage = mandreel_getlocalstorage();

	my_localStorage.removeItem(key_a);
	my_localStorage.removeItem(key_a + '_size');
	r_g0 = 0;

 }