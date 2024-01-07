function callAndCheck(gl, func) {
	  var returnValue = func();

	  if (env().getBool('DEBUG')) {
	    checkWebGLError(gl);
	  }

	  return returnValue;
	}