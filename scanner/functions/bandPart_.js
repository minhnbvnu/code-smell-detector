function bandPart_(a, numLower, numUpper) {
	  assert(numLower % 1 === 0, function () {
	    return "bandPart(): numLower must be an integer, got " + numLower + ".";
	  });
	  assert(numUpper % 1 === 0, function () {
	    return "bandPart(): numUpper must be an integer, got " + numUpper + ".";
	  });
	  var $a = convertToTensor(a, 'a', 'bandPart');
	  assert($a.rank >= 2, function () {
	    return "bandPart(): Rank must be at least 2, got " + $a.rank + ".";
	  });
	  var shape = $a.shape;

	  var _$a$shape$slice = $a.shape.slice(-2),
	      M = _$a$shape$slice[0],
	      N = _$a$shape$slice[1];

	  if (!(numLower <= M)) {
	    throw new Error("bandPart(): numLower (" + numLower + ")" + (" must not be greater than the number of rows (" + M + ")."));
	  }

	  if (!(numUpper <= N)) {
	    throw new Error("bandPart(): numUpper (" + numUpper + ")" + (" must not be greater than the number of columns (" + N + ")."));
	  }

	  if (numLower < 0) {
	    numLower = M;
	  }

	  if (numUpper < 0) {
	    numUpper = N;
	  }

	  var i = reshape(range(0, M, 1, 'int32'), [-1, 1]);
	  var j = range(0, N, 1, 'int32');
	  var ij = sub(i, j);
	  var inBand = logicalAnd(lessEqual(ij, scalar(+numLower, 'int32')), greaterEqual(ij, scalar(-numUpper, 'int32')));
	  var zero = zeros([M, N], $a.dtype);
	  return reshape(stack(unstack(reshape($a, [-1, M, N])).map(function (mat) {
	    return where(inBand, mat, zero);
	  })), shape);
	}