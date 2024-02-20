function myglGetActiveUniform (sp)
  {
	var program_id = heap32[sp>>2];sp+=4;
	var index = heap32[sp>>2];sp+=4;
	var ptr = heap32[sp>>2];sp+=4;

	 var result = imandreel_gl.getActiveUniform(array_ids_ogl[program_id], index);

	 if (result != null)
	 {
		heap32[(ptr)>>2] = result.size;
		heap32[(ptr+4)>>2] = result.type;
		fill_ptr_from_string(ptr+8, result.name);
		r_g0 = 0;
	}
	else
	   r_g0 = 1;
  }