function resizeBilinear$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var images = inputs.images;
	  var alignCorners = attrs.alignCorners,
	      halfPixelCenters = attrs.halfPixelCenters,
	      size = attrs.size;
	  var newHeight = size[0],
	      newWidth = size[1];
	  var program = env().getBool('WEBGL_PACK_IMAGE_OPERATIONS') ? new ResizeBilinearPackedProgram(images.shape, newHeight, newWidth, alignCorners, halfPixelCenters) : new ResizeBilinearProgram(images.shape, newHeight, newWidth, alignCorners, halfPixelCenters);
	  return backend.runWebGLProgram(program, [images], 'float32');
	}