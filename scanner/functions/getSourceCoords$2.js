function getSourceCoords$2(aShape) {
	  var rank = aShape.length;

	  if (rank > 5) {
	    throw Error("Tile for rank " + rank + " is not yet supported");
	  }

	  if (rank === 1) {
	    return "imod(resRC, " + aShape[0] + ")";
	  }

	  var currentCoords = ['resRC.x', 'resRC.y', 'resRC.z', 'resRC.w', 'resRC.u'];
	  var sourceCoords = [];

	  for (var i = 0; i < aShape.length; i++) {
	    sourceCoords.push("imod(" + currentCoords[i] + ", " + aShape[i] + ")");
	  }

	  return sourceCoords.join();
	}