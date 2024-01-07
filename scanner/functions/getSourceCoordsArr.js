function getSourceCoordsArr(rank, dims) {
	  var coords = [];

	  for (var row = 0; row <= 1; row++) {
	    for (var col = 0; col <= 1; col++) {
	      var coord = (row === 0 ? 'r' : 'rp1') + ", " + (col === 0 ? 'c' : 'cp1');

	      for (var d = 2; d < rank; d++) {
	        coord = dims[dims.length - 1 - d] + "," + coord;
	      }

	      coords.push(coord);
	    }
	  }

	  return coords;
	}