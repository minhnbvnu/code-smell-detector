function mandreel_ungetc(sp)
  {
	var my_char = heap32[sp>>2];sp+=4;
	var file_id = heap32[sp>>2];sp+=4;

	var offset = file_ids[file_id].offset-1;

	var byteArray = file_ids[file_id].byteArray;

	assert(byteArray[offset] == my_char);

	file_ids[file_id].offset = offset;

	return my_char;
  }