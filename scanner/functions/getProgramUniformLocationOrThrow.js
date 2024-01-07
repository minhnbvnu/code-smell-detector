function getProgramUniformLocationOrThrow(gl, program, uniformName) {
	  return throwIfNull(gl, function () {
	    return gl.getUniformLocation(program, uniformName);
	  }, 'uniform "' + uniformName + '" not present in program.');
	}