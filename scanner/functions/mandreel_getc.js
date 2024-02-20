function mandreel_getc(sp)
  {
  var file_id = heap32[sp>>2];sp+=4;


  var offset = file_ids[file_id].offset;


	var buffer = file_ids[file_id].buffer;

	var byteArray = file_ids[file_id].byteArray;

	var total = 1;

	var result;

	if ((offset+total)>buffer.byteLength)
	{
		result = -1;
	}
	else
	{
		result = byteArray[offset];
		file_ids[file_id].offset+=total;
	}

	r_g0 = result;
  }