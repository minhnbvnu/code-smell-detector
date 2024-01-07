function mirrorPad$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var paddings = attrs.paddings,
	      mode = attrs.mode;
	  assertNotComplex(x, 'mirrorPad');
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
	  var end = paddings.map(function (p, i) {
	    return p[0] + x.shape[i];
	  });
	  var offset = mode === 'reflect' ? 0 : 1;
	  var xVals = backend.data.get(x.dataId).values;
	  var xRank = x.shape.length;
	  var xStrides = computeStrides(x.shape);
	  var resultSize = sizeFromShape(outShape);
	  var resultRank = outShape.length;
	  var resultStrides = computeStrides(outShape);
	  var resVals = getTypedArrayFromDType(x.dtype, resultSize);

	  for (var i = 0; i < resultSize; i++) {
	    var coords = indexToLoc(i, resultRank, resultStrides);

	    for (var _i = 0; _i < resultRank; _i++) {
	      if (coords[_i] < start[_i]) {
	        coords[_i] = start[_i] * 2 - coords[_i] - offset;
	      } else if (coords[_i] >= end[_i]) {
	        coords[_i] = (end[_i] - 1) * 2 - coords[_i] + offset;
	      }
	    }

	    coords = coords.map(function (c, i) {
	      return c - start[i];
	    });
	    var inIndex = locToIndex(coords, xRank, xStrides);
	    resVals[i] = xVals[inIndex];
	  }

	  var outId = backend.write(resVals, outShape, x.dtype);
	  return {
	    dataId: outId,
	    shape: outShape,
	    dtype: x.dtype
	  };
	}