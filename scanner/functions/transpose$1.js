function transpose$1(args) {
	  var inputs = args.inputs,
	      attrs = args.attrs,
	      backend = args.backend;
	  var x = inputs.x;
	  var perm = attrs.perm;
	  assertNotComplex(x, 'transpose');
	  var xRank = x.shape.length;
	  var newShape = new Array(xRank);

	  for (var i = 0; i < newShape.length; i++) {
	    newShape[i] = x.shape[perm[i]];
	  }

	  var values = backend.data.get(x.dataId).values;
	  var result = transposeImpl(values, x.shape, x.dtype, perm, newShape);
	  var dataId = backend.write(result, newShape, x.dtype);
	  return {
	    dataId: dataId,
	    shape: newShape,
	    dtype: x.dtype
	  };
	}