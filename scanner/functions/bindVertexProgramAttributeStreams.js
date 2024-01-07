function bindVertexProgramAttributeStreams(gl, program, vertexBuffer) {
	  var posOffset = 0; // x is the first buffer element

	  var uvOffset = 3 * 4; // uv comes after [x y z]

	  var stride = 3 * 4 + 2 * 4; // xyz + uv, each entry is 4-byte float.

	  callAndCheck(gl, function () {
	    return gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	  });
	  var success = bindVertexBufferToProgramAttribute(gl, program, 'clipSpacePos', vertexBuffer, 3, stride, posOffset);
	  return success && bindVertexBufferToProgramAttribute(gl, program, 'uv', vertexBuffer, 2, stride, uvOffset);
	}