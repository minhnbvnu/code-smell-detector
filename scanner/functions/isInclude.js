function isInclude(smallArray, bigArray) {
	  // attention: [0,0,1] [0,0,10]
	  return smallArray.every(function (ii, i) {
	    return ii === bigArray[i];
	  });
	}