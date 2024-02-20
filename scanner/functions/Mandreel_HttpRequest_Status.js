function Mandreel_HttpRequest_Status(sp)
{
	var _id = heap32[sp>>2];sp+=4;
	var id = _id-1;


	r_g0 = mandreel_js_mapping_ids[id].status;
}