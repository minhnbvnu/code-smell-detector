function myglBindTexture(sp)
  {
  var texture_type = heap32[sp>>2];sp+=4;
  var texture_id = heap32[sp>>2];sp+=4;

if (texture_id == 0)
{
	imandreel_gl.bindTexture(texture_type, null);
}
else
{
	var tex = array_ids_ogl[texture_id];
	imandreel_gl.bindTexture(texture_type, tex);
	}

  }