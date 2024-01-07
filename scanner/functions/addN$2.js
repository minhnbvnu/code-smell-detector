function addN$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var tensors = inputs;

	  if (tensors.length === 1) {
	    return identity$2({
	      inputs: {
	        x: tensors[0]
	      },
	      backend: backend
	    });
	  } // Limit the number of uploaded textures for optimization.


	  if (tensors.length > env().get('WEBGL_MAX_TEXTURES_IN_SHADER')) {
	    var midIndex = Math.floor(tensors.length / 2);
	    var leftSide = addN$2({
	      inputs: tensors.slice(0, midIndex),
	      backend: backend
	    });
	    var rightSide = addN$2({
	      inputs: tensors.slice(midIndex),
	      backend: backend
	    });
	    return addN$2({
	      inputs: [leftSide, rightSide],
	      backend: backend
	    });
	  }

	  var dtype = tensors.map(function (t) {
	    return t.dtype;
	  }).reduce(function (d1, d2) {
	    return upcastType(d1, d2);
	  });
	  var shapes = tensors.map(function (t) {
	    return t.shape;
	  }); // We can make sure shapes are identical in op level.

	  var usePackedOp = env().getBool('WEBGL_PACK');
	  var program = usePackedOp ? new AddNPackedProgram(tensors[0].shape, shapes) : new AddNProgram(tensors[0].shape, shapes);
	  return backend.runWebGLProgram(program, tensors, dtype);
	}