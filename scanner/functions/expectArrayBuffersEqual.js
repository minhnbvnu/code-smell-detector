function expectArrayBuffersEqual(actual, expected) {
	  // Safari & Jasmine don't like comparing ArrayBuffers directly. Wrapping in
	  // a Float32Array solves this issue.
	  expect(new Float32Array(actual)).toEqual(new Float32Array(expected));
	}