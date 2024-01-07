function createFragmentShader(gl, fragmentShaderSource) {
	  var fragmentShader = throwIfNull(gl, function () {
	    return gl.createShader(gl.FRAGMENT_SHADER);
	  }, 'Unable to create fragment WebGLShader.');
	  callAndCheck(gl, function () {
	    return gl.shaderSource(fragmentShader, fragmentShaderSource);
	  });
	  callAndCheck(gl, function () {
	    return gl.compileShader(fragmentShader);
	  });

	  if (gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS) === false) {
	    logShaderSourceAndInfoLog(fragmentShaderSource, gl.getShaderInfoLog(fragmentShader));
	    throw new Error('Failed to compile fragment shader.');
	  }

	  return fragmentShader;
	}