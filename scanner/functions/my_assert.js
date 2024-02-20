function my_assert(sp)
  {
	var p0 = heap32[sp>>2];sp+=4;
  var p1 = heap32[sp>>2];sp+=4;
	//var name = get_string_from_ptr(p1);

	assert(false, 'hola');
  }