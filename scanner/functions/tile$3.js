function tile$3(params) {
	  var inputs = params.inputs,
	      backend = params.backend,
	      attrs = params.attrs;
	  var x = inputs.x;
	  var reps = attrs.reps;

	  if (x.dtype === 'string') {
	    // Even thought string tensor is always on CPU, just to be consistent on how
	    // to access tensor data.
	    var data = backend.readSync(x.dataId);
	    var decodedData = data.map(function (d) {
	      return decodeString(d);
	    });
	    var buf = buffer(x.shape, x.dtype, decodedData);
	    var outBuf = tileImplCPU(buf, reps);
	    return backend.makeTensorInfo(outBuf.shape, outBuf.dtype, outBuf.values);
	  }

	  var program = new TileProgram(x.shape, reps);
	  var output = backend.runWebGLProgram(program, [x], x.dtype);
	  return output;
	}