function Mandreel_TextureAsync_SetData(sp)
{
	var texture_id = heap32[sp>>2];sp+=4;

	var tex = array_ids_ogl[texture_id];

	if ( mandreelAppPlatform != "canvas" )
	{
		imandreel_gl.texImage2D(imandreel_gl.TEXTURE_2D, 0, imandreel_gl.RGBA, imandreel_gl.RGBA, imandreel_gl.UNSIGNED_BYTE, tex.image);
		tex.image = null;
	}
}