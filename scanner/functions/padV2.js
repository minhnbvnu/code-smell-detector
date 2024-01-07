function padV2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var paddings = attrs.paddings,
	      constantValue = attrs.constantValue;
	  assertNotComplex(x, 'pad');
	  var outShape = paddings.map(function (p, i) {
	    return p[0]
	    /* beforePad */
	    + x.shape[i] + p[1];
	  }
	  /* afterPad */
	  );
	  var start = paddings.map(function (p) {
	    return p[0];
	  });
	  var xVals = backend.data.get(x.dataId).values;
	  var xSize = sizeFromShape(x.shape);
	  var xRank = x.shape.length;
	  var xStrides = computeStrides(x.shape);
	  var resultSize = sizeFromShape(outShape);
	  var resultRank = outShape.length;
	  var resultStrides = computeStrides(outShape);
	  var resVals = getTypedArrayFromDType(x.dtype, resultSize);

	  if (constantValue !== 0) {
	    resVals.fill(constantValue);
	  }

	  for (var i = 0; i < xSize; i++) {
	    var coords = indexToLoc(i, xRank, xStrides);
	    var outCoords = coords.map(function (c, i) {
	      return c + start[i];
	    });
	    var outIndex = locToIndex(outCoords, resultRank, resultStrides);
	    resVals[outIndex] = xVals[i];
	  }

	  var outId = backend.write(resVals, outShape, x.dtype);
	  return {
	    dataId: outId,
	    shape: outShape,
	    dtype: x.dtype
	  };
	}