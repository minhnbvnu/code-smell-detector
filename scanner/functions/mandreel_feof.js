function mandreel_feof(sp)
  {
  var file_id = heap32[sp>>2];sp+=4;

  var offset = file_ids[file_id].offset;
  var total = file_ids[file_id].buffer.byteLength;

  if (offset>=total)
  r_g0 = 1;
  else
  r_g0 = 0;

  }