function Mandreel_HttpRequest_SetRequestHeader(sp)
{
	var _id = heap32[sp>>2];sp+=4;
	var ptr_a = heap32[sp>>2];sp+=4;
	var ptr_b = heap32[sp>>2];sp+=4;
	var id = _id-1;

	var str_a = get_string_from_ptr(ptr_a);
	var str_b = get_string_from_ptr(ptr_b);

	var my_state = mandreel_js_mapping_ids[id];

	my_state.httpRequest.setRequestHeader(str_a, str_b);
}