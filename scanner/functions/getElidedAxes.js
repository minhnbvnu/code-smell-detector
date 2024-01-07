function getElidedAxes(numElidedAxes, ellipsisInsertionIndex) {
	  var elidedAxes = [];

	  for (var i = 0; i < numElidedAxes; i++) {
	    elidedAxes.push(ellipsisInsertionIndex + i);
	  }

	  return elidedAxes;
	}