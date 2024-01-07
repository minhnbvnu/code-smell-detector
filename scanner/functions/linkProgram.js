function linkProgram(gl, program) {
	  callAndCheck(gl, function () {
	    return gl.linkProgram(program);
	  });

	  if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
	    console.log(gl.getProgramInfoLog(program));
	    throw new Error('Failed to link vertex and fragment shaders.');
	  }
	}