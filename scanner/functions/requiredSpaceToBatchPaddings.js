function requiredSpaceToBatchPaddings(inputShape, blockShape, basePadding) {
	  var padStart = basePadding.map(function (b) {
	    return b[0];
	  });
	  var origPadEnd = basePadding.map(function (b) {
	    return b[1];
	  });
	  var fullInputShape = inputShape.concat(padStart, origPadEnd);
	  var padEndExtra = blockShape.map(function (b, i) {
	    return (b - fullInputShape[i] % b) % b;
	  });
	  var padEnd = origPadEnd.map(function (s, i) {
	    return s + padEndExtra[i];
	  });
	  var paddings = blockShape.map(function (_, i) {
	    return [padStart[i], padEnd[i]];
	  });
	  var crops = blockShape.map(function (_, i) {
	    return [0, padEndExtra[i]];
	  });
	  return [paddings, crops];
	}