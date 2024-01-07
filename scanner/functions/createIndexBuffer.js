function createIndexBuffer(gl) {
	  // OpenGL (and WebGL) have "CCW == front" winding
	  var triangleVertexIndices = new Uint16Array([0, 1, 2, 2, 1, 3]);
	  return createStaticIndexBuffer(gl, triangleVertexIndices);
	}