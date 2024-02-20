function mandreel_fseek(sp)
  {
  var file_id = heap32[sp>>2];sp+=4;
  var pos = heap32[sp>>2];sp+=4;
  var type = heap32[sp>>2];sp+=4;

	if (type == 2)
	{
		file_ids[file_id].offset = file_ids[file_id].buffer.byteLength + pos;
	}
	else if (type == 1)
	{
		file_ids[file_id].offset = file_ids[file_id].offset + pos;

	}
	else if (type == 0)
	{
		file_ids[file_id].offset = pos;

	}

	r_g0 = 0;

	//return 0;
  }