function resizeNearestNeighbor$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var images = inputs.images;
	  var alignCorners = attrs.alignCorners,
	      halfPixelCenters = attrs.halfPixelCenters,
	      size = attrs.size;
	  var newHeight = size[0],
	      newWidth = size[1];
	  var program = new ResizeNearestNeighborProgram(images.shape, newHeight, newWidth, alignCorners, halfPixelCenters);
	  return backend.runWebGLProgram(program, [images], images.dtype);
	}