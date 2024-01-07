function hasExtension(gl, extensionName) {
	  var ext = gl.getExtension(extensionName);
	  return ext != null;
	}