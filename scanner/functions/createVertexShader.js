function createVertexShader(gl, vertexShaderSource) {
	  var vertexShader = throwIfNull(gl, function () {
	    return gl.createShader(gl.VERTEX_SHADER);
	  }, 'Unable to create vertex WebGLShader.');
	  callAndCheck(gl, function () {
	    return gl.shaderSource(vertexShader, vertexShaderSource);
	  });
	  callAndCheck(gl, function () {
	    return gl.compileShader(vertexShader);
	  });

	  if (gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS) === false) {
	    console.log(gl.getShaderInfoLog(vertexShader));
	    throw new Error('Failed to compile vertex shader.');
	  }

	  return vertexShader;
	}