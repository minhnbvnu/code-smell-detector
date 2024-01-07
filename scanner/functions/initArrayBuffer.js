function initArrayBuffer(triangleVertexCoords) {
		// put triangle coordinates into a WebGL ArrayBuffer and bind to
		// shader's 'position' attribute variable
		const rawData = new Float32Array(triangleVertexCoords);
		const polygonArrayBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, polygonArrayBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, rawData, gl.STATIC_DRAW);
		gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

		return triangleVertexCoords.length / 2;
	}