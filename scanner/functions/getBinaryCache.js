function getBinaryCache(webGLVersion) {
	  if (webGLVersion in binaryCaches) {
	    return binaryCaches[webGLVersion];
	  }

	  binaryCaches[webGLVersion] = {};
	  return binaryCaches[webGLVersion];
	}