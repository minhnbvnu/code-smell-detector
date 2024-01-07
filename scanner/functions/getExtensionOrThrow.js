function getExtensionOrThrow(gl, extensionName) {
	  return throwIfNull(gl, function () {
	    return gl.getExtension(extensionName);
	  }, 'Extension "' + extensionName + '" not supported on this browser.');
	}