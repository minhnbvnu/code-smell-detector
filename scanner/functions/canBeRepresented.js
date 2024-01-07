function canBeRepresented(num) {
	  if (env().getBool('WEBGL_RENDER_FLOAT32_ENABLED') || num === 0 || MIN_FLOAT16 < Math.abs(num) && Math.abs(num) < MAX_FLOAT16) {
	    return true;
	  }

	  return false;
	}