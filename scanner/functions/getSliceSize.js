function getSliceSize(uncroppedShape, crops, blockShape) {
	  var sliceSize = uncroppedShape.slice(0, 1);

	  for (var i = 0; i < blockShape; ++i) {
	    sliceSize.push(uncroppedShape[i + 1] - crops[i][0] - crops[i][1]);
	  }

	  return sliceSize;
	}