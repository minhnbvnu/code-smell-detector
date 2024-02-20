function mandreel_ftell(sp)
  {
  var file_id = heap32[sp>>2];sp+=4;

	var value = file_ids[file_id].offset;
	//dump('offset ftell ' + value + '\n');
	r_g0 = value;
	//return value;
  }