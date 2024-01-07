function transposeImpl(xVals, xShape, dtype, perm, newShape) {
	  var xRank = xShape.length;
	  var xSize = sizeFromShape(xShape);
	  var xStrides = computeStrides(xShape);
	  var newStrides = computeStrides(newShape);
	  var result = getTypedArrayFromDType(dtype, sizeFromShape(newShape));

	  for (var i = 0; i < xSize; ++i) {
	    var loc = indexToLoc(i, xRank, xStrides); // Permute location.

	    var newLoc = new Array(loc.length);

	    for (var _i = 0; _i < newLoc.length; _i++) {
	      newLoc[_i] = loc[perm[_i]];
	    }

	    var newIndex = locToIndex(newLoc, xRank, newStrides);
	    result[newIndex] = xVals[i];
	  }

	  return result;
	}