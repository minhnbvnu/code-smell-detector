function diag$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var x = inputs.x;
	  var xSize = sizeFromShape(x.shape);
	  var xVals = backend.data.get(x.dataId).values;
	  var outBuf = buffer([xSize, xSize], x.dtype);
	  var vals = outBuf.values;

	  for (var i = 0; i < xVals.length; i++) {
	    vals[i * xSize + i] = xVals[i];
	  }

	  var outShape = [].concat(x.shape, x.shape);
	  return backend.makeTensorInfo(outShape, outBuf.dtype, outBuf.values);
	}