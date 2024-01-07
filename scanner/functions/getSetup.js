function getSetup(rank, cols, rows, dims) {
	  if (rank === 1) {
	    return '';
	  }

	  var innerDims = dims.slice(-2);
	  return "\n    int r = " + innerDims[0] + ";\n    int c = " + innerDims[1] + ";\n    int rp1 = r + 1;\n    int cp1 = c + 1;\n\n    bool cEdge = cp1 >= " + cols + ";\n    bool rEdge = rp1 >= " + rows + ";\n  ";
	}