function getSourceCoords$1(aShape, axis) {
	  var currentCoords = ['resRC.x', 'resRC.y', 'resRC.z', 'resRC.w'];
	  var sourceCoords = [];

	  for (var i = 0; i < aShape.length; i++) {
	    if (i === 2) {
	      sourceCoords.push('int(getIndices(resRC.x, resRC.z))');
	    } else {
	      sourceCoords.push("" + currentCoords[i]);
	    }
	  }

	  return sourceCoords.join();
	}