function combineLocations(outputLoc, reduceLoc, axes) {
	  var rank = outputLoc.length + reduceLoc.length;
	  var loc = [];
	  var outIdx = 0;
	  var reduceIdx = 0;

	  for (var dim = 0; dim < rank; dim++) {
	    if (axes.indexOf(dim) === -1) {
	      loc.push(outputLoc[outIdx++]);
	    } else {
	      loc.push(reduceLoc[reduceIdx++]);
	    }
	  }

	  return loc;
	}