function getOutput(shape, dims) {
	  var rank = shape.length;
	  var sourceCoords = getSourceCoordsArr(rank, dims);

	  if (rank === 1) {
	    return "getA(rc),\n            rc + 1 >= " + shape[0] + " ? 0. : getA(rc + 1),\n            0, 0";
	  }

	  return "getA(" + sourceCoords[0] + "),\n          cEdge ? 0. : getA(" + sourceCoords[1] + "),\n          rEdge ? 0. : getA(" + sourceCoords[2] + "),\n          rEdge || cEdge ? 0. : getA(" + sourceCoords[3] + ")";
	}