function Mandreel_HttpRequest_Close(sp)
{
	var _id = heap32[sp>>2];sp+=4;
	var id = _id-1;

	mandreel_js_mapping_ids[id] = null;
	mandreel_js_mapping_ids_free.push(id);
}