function Mandreel_TextureAsync_GetProperties(sp)
{
	var texture_id = heap32[sp>>2];sp+=4;
	var ptr_width = heap32[sp>>2];sp+=4;
	var ptr_height = heap32[sp>>2];sp+=4;

	var tex = array_ids_ogl[texture_id];

	if (tex == null || tex.mandreel_width == undefined)
		r_g0 = 0;
	else
	{
		heap32[ptr_width>>2] = tex.mandreel_width;
		heap32[ptr_height>>2] = tex.mandreel_height;
		r_g0 = 1;
	}
}