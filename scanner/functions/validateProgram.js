function validateProgram(gl, program) {
	  callAndCheck(gl, function () {
	    return gl.validateProgram(program);
	  });

	  if (gl.getProgramParameter(program, gl.VALIDATE_STATUS) === false) {
	    console.log(gl.getProgramInfoLog(program));
	    throw new Error('Shader program validation failed.');
	  }
	}