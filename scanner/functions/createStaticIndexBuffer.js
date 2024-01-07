function createStaticIndexBuffer(gl, data) {
	  var buffer = throwIfNull(gl, function () {
	    return gl.createBuffer();
	  }, 'Unable to create WebGLBuffer');
	  callAndCheck(gl, function () {
	    return gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
	  });
	  callAndCheck(gl, function () {
	    return gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
	  });
	  return buffer;
	}