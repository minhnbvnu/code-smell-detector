function resizeBilinearGrad$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var images = inputs.images,
	      dy = inputs.dy;
	  var alignCorners = attrs.alignCorners;
	  var program = new ResizeBilinearBackpropProgram(dy.shape, images.shape, alignCorners);
	  return backend.runWebGLProgram(program, [dy], dy.dtype);
	}