function resizeNearestNeighborGrad$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var images = inputs.images,
	      dy = inputs.dy;
	  var alignCorners = attrs.alignCorners;
	  var program = new ResizeNearestNeigborBackpropProgram(dy.shape, images.shape, alignCorners);
	  return backend.runWebGLProgram(program, [dy], dy.dtype);
	}