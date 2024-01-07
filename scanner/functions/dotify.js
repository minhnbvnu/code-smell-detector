function dotify(x, y) {
	  if (x.length !== y.length) {
	    throw new Error("Vectors to be dotted must be of the same length -" + ("got " + x.length + " and " + y.length));
	  }

	  var slices = [];
	  var nearestVec4 = Math.floor(x.length / 4);
	  var nearestVec4Remainder = x.length % 4;

	  for (var i = 0; i < nearestVec4; i++) {
	    var xSlice = x.slice(i * 4, i * 4 + 4);
	    var ySlice = y.slice(i * 4, i * 4 + 4);
	    slices.push(buildVec(xSlice) + ", " + buildVec(ySlice));
	  }

	  if (nearestVec4Remainder !== 0) {
	    var _xSlice = x.slice(nearestVec4 * 4);

	    var _ySlice = y.slice(nearestVec4 * 4);

	    if (_xSlice.length === 1) {
	      _xSlice = _xSlice.map(function (d) {
	        return "float(" + d + ")";
	      });
	      _ySlice = _ySlice.map(function (d) {
	        return "float(" + d + ")";
	      });
	    }

	    slices.push(buildVec(_xSlice) + ", " + buildVec(_ySlice));
	  }

	  return slices.map(function (d, i) {
	    return "dot(" + d + ")";
	  }).join('+');
	}