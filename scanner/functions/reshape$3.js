function reshape$3(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var shape = attrs.shape;
	  var webglBackend = backend;
	  var xSize = sizeFromShape(x.shape);
	  var $shape = inferFromImplicitShape(shape, xSize);
	  var $xSize = sizeFromShape($shape);
	  assert(xSize === $xSize, function () {
	    return "The new shape (" + $shape + ") has " + $xSize + " elements and the old " + ("shape (" + x.shape + ") has " + xSize + " elements. The new shape and old ") + "shape must have the same number of elements.";
	  });
	  var xTexData = webglBackend.texData.get(x.dataId);

	  if (xTexData.isPacked && !isReshapeFree(x.shape, $shape) && !(xTexData.texture !== null && isReshapeFree(xTexData.shape, $shape))) {
	    return packedReshape(x, $shape, webglBackend);
	  }

	  webglBackend.incRef(x.dataId);
	  return {
	    dataId: x.dataId,
	    shape: $shape,
	    dtype: x.dtype
	  };
	}