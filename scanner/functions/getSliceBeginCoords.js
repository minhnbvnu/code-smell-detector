function getSliceBeginCoords(crops, blockShape) {
	  var sliceBeginCoords = [0];

	  for (var i = 0; i < blockShape; ++i) {
	    sliceBeginCoords.push(crops[i][0]);
	  }

	  return sliceBeginCoords;
	}