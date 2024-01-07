function slice$4(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var begin = attrs.begin,
	      size = attrs.size;

	  var _slice_util$parseSlic = parseSliceParams(x, begin, size),
	      $begin = _slice_util$parseSlic[0],
	      $size = _slice_util$parseSlic[1];

	  assertParamsValid(x, $begin, $size);

	  if (sizeFromShape($size) === 0) {
	    return backend.makeTensorInfo($size, x.dtype, []);
	  } // Run on cpu if dtype is string. For string, the backend represents it
	  // as Uint8Array[], where each Uint8Array is a character. Given that the
	  // computation is only on the outer array, uploading the whole data onto
	  // gpu is wasteful. Also, currently webgl doesn't have a design to
	  // upload and retrieve Uint8Array[] between cpu and gpu. Therefore, we
	  // just run the kernel on cpu if dtype is string.


	  if (backend.shouldExecuteOnCPU([x]) || x.dtype === 'string') {
	    var xTexData = backend.texData.get(x.dataId);
	    var outValues = sliceImplCPU(xTexData.values, $begin, $size, x.shape, x.dtype);
	    return backend.makeTensorInfo($size, x.dtype, outValues);
	  }

	  var _backend$texData$get = backend.texData.get(x.dataId),
	      isPacked = _backend$texData$get.isPacked;

	  var isContinous = isSliceContinous(x.shape, $begin, $size);

	  if (isPacked || !isContinous) {
	    var program = env().getBool('WEBGL_PACK_ARRAY_OPERATIONS') ? new SlicePackedProgram($size) : new SliceProgram($size);
	    var customSetup = program.getCustomSetupFunc($begin);
	    return backend.runWebGLProgram(program, [x], x.dtype, customSetup);
	  }

	  backend.uploadToGPU(x.dataId);
	  return shallowSlice(x, $begin, $size, backend);
	}