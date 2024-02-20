function Mandreel_HttpRequest_Read(sp)
{
	var _id = heap32[sp>>2];sp+=4;
	var ptr = heap32[sp>>2];sp+=4;
	var size = heap32[sp>>2];sp+=4;
	var id = _id-1;

	var remaining_bytes =  mandreel_js_mapping_ids[id].buffer.length - mandreel_js_mapping_ids[id].offset_read;

	if (size>remaining_bytes)
		size = remaining_bytes;

	var sub_array = mandreel_js_mapping_ids[id].buffer.subarray(mandreel_js_mapping_ids[id].offset_read, mandreel_js_mapping_ids[id].offset_read+size);
	heapU8.set(sub_array,ptr);

	mandreel_js_mapping_ids[id].offset_read+=size;

	r_g0 = size;
}