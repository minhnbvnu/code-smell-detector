function Mandreel_HttpRequest_BytesAvalable(sp)
{
	var _id = heap32[sp>>2];sp+=4;
	var id = _id-1;


	if (mandreel_js_mapping_ids[id].buffer)
		r_g0 = mandreel_js_mapping_ids[id].buffer.length - mandreel_js_mapping_ids[id].offset_read;
	else
		r_g0 = 0;
}