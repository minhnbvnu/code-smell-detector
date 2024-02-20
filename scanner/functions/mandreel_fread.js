function mandreel_fread(sp)
  {
  var ptr = heap32[sp>>2];sp+=4;
  var size = heap32[sp>>2];sp+=4;
  var count = heap32[sp>>2];sp+=4;
  var file_id = heap32[sp>>2];sp+=4;

  var offset = file_ids[file_id].offset;

  //dump('fread ' + ptr + ' ' + size + ' ' + count + ' ' + file_id + ' ' + offset + '\n');

	var buffer = file_ids[file_id].buffer;

	var total = size*count;

	if ((offset+total)>buffer.byteLength)
		total = buffer.byteLength-offset;

	var byteArray = file_ids[file_id].byteArray;


	var sub_array = byteArray.subarray(offset, offset+total);

	heapU8.set(sub_array,ptr);


	//heapU8.set(byteArray, ptr);
	//for (var i=0;i<total;++i)
	//{
//		heapU8[ptr+i] = byteArray[i+offset];
//	}


	file_ids[file_id].offset+=total;

	r_g0 = total/size;
	//return total;
  }