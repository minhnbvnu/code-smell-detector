function logSumExp_(x, axis, keepDims) {
	  if (axis === void 0) {
	    axis = null;
	  }

	  if (keepDims === void 0) {
	    keepDims = false;
	  }

	  var $x = convertToTensor(x, 'x', 'logSumExp');
	  var axes = parseAxisParam(axis, $x.shape);
	  var xMax = max$4($x, axes, true
	  /* keepDims */
	  );
	  var a = sub($x, xMax);
	  var b = exp$3(a);
	  var c = sum$1(b, axes);
	  var d = log$9(c);
	  var res = add$1(reshape(xMax, d.shape), d);

	  if (keepDims) {
	    var newShape = expandShapeToKeepDim(res.shape, axes);
	    return reshape(res, newShape);
	  }

	  return res;
	}