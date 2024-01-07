function unique$3(args) {
	  var inputs = args.inputs,
	      attrs = args.attrs,
	      backend = args.backend;
	  var axis = attrs.axis;
	  var x = inputs.x;
	  assertNotComplex$1(x, 'unique'); // For now, always forward calculation to the CPU backend.

	  console.warn('WARNING: ', 'UI might be locked temporarily as data is being downloaded');
	  var values = backend.readSync(x.dataId);

	  var _uniqueImplCPU = uniqueImplCPU(values, axis, x.shape, x.dtype),
	      outputValues = _uniqueImplCPU.outputValues,
	      outputShape = _uniqueImplCPU.outputShape,
	      indices = _uniqueImplCPU.indices;

	  return [backend.makeTensorInfo(outputShape, x.dtype, outputValues), backend.makeTensorInfo([indices.length], 'int32', indices)];
	}