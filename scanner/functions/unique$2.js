function unique$2(args) {
	  var inputs = args.inputs,
	      attrs = args.attrs,
	      backend = args.backend;
	  var axis = attrs.axis;
	  var x = inputs.x;
	  assertNotComplex(x, 'unique');
	  var values = backend.data.get(x.dataId).values;

	  var _uniqueImpl = uniqueImpl(values, axis, x.shape, x.dtype),
	      outputValues = _uniqueImpl.outputValues,
	      outputShape = _uniqueImpl.outputShape,
	      indices = _uniqueImpl.indices;

	  return [backend.makeTensorInfo(outputShape, x.dtype, outputValues), backend.makeTensorInfo([indices.length], 'int32', indices)];
	}