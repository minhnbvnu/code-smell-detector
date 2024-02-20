function mandreel_rewind(sp)
  {
  var file_id = heap32[sp>>2];sp+=4;

  file_ids[file_id].offset = 0;

	r_g0 = 0;

	//return 0;
  }