function bindVertexBufferToProgramAttribute(gl, program, attribute, buffer, arrayEntriesPerItem, itemStrideInBytes, itemOffsetInBytes) {
	  var loc = gl.getAttribLocation(program, attribute);

	  if (loc === -1) {
	    // The GPU compiler decided to strip out this attribute because it's unused,
	    // thus no need to bind.
	    return false;
	  }

	  callAndCheck(gl, function () {
	    return gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	  });
	  callAndCheck(gl, function () {
	    return gl.vertexAttribPointer(loc, arrayEntriesPerItem, gl.FLOAT, false, itemStrideInBytes, itemOffsetInBytes);
	  });
	  callAndCheck(gl, function () {
	    return gl.enableVertexAttribArray(loc);
	  });
	  return true;
	}