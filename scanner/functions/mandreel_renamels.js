function mandreel_renamels(sp)
 {
 var ptr_name_a = heap32[sp>>2];sp+=4;
  var ptr_name_b = heap32[sp>>2];sp+=4;

  var key_a = get_string_from_ptr(ptr_name_a);
  var key_b = get_string_from_ptr(ptr_name_b);

  var my_localStorage = mandreel_getlocalstorage();


  var value = my_localStorage.getItem(key_a);
  var value2 = my_localStorage.getItem(key_a + '_size');

  if (value != null && value2 != null)
  {
	my_localStorage.setItem(key_b, value);
	my_localStorage.setItem(key_b + '_size', value2);

	my_localStorage.removeItem(key_a);
	my_localStorage.removeItem(key_a + '_size');


	r_g0 = 0;
}
else
 r_g0 = -1;
 }