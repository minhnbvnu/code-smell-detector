function getSwitchedCoords(newDim) {
	  var rank = newDim.length;

	  if (rank > 6) {
	    throw Error("Transpose for rank " + rank + " is not yet supported");
	  }

	  var originalOrder = ['resRC.x', 'resRC.y', 'resRC.z', 'resRC.w', 'resRC.u', 'resRC.v'];
	  var switchedCoords = new Array(rank);

	  for (var i = 0; i < newDim.length; i++) {
	    switchedCoords[newDim[i]] = originalOrder[i];
	  }

	  return switchedCoords.join();
	}