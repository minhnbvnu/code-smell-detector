function reshape$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var shape = attrs.shape;
	  var xSize = sizeFromShape(x.shape);
	  var $shape = inferFromImplicitShape(shape, xSize);
	  var $xSize = sizeFromShape($shape);
	  assert(xSize === $xSize, function () {
	    return "The new shape (" + $shape + ") has " + $xSize + " elements and the old " + ("shape (" + x.shape + ") has " + xSize + " elements. The new shape and old ") + "shape must have the same number of elements.";
	  });
	  backend.incRef(x.dataId);
	  var xData = backend.data.get(x.dataId);

	  if (xData.complexTensorInfos != null) {
	    var real = xData.complexTensorInfos.real;
	    var imag = xData.complexTensorInfos.imag;
	    real.shape = $shape;
	    imag.shape = $shape;
	  }

	  return {
	    dataId: x.dataId,
	    shape: $shape,
	    dtype: x.dtype
	  };
	}