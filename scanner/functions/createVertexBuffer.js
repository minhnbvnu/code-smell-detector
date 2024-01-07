function createVertexBuffer(gl) {
	  // [x y z u v] * [upper-left, lower-left, upper-right, lower-right]
	  var vertexArray = new Float32Array([-1, 1, 0, 0, 1, -1, -1, 0, 0, 0, 1, 1, 0, 1, 1, 1, -1, 0, 1, 0]);
	  return createStaticVertexBuffer(gl, vertexArray);
	}