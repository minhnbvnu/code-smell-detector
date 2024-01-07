function whereImpl(condShape, condVals) {
	  var indices = [];

	  for (var i = 0; i < condVals.length; i++) {
	    if (condVals[i]) {
	      indices.push(i);
	    }
	  }

	  var inBuffer = buffer(condShape, 'int32');
	  var out = buffer([indices.length, condShape.length], 'int32');

	  for (var _i = 0; _i < indices.length; _i++) {
	    var loc = inBuffer.indexToLoc(indices[_i]);
	    var offset = _i * condShape.length;
	    out.values.set(loc, offset);
	  }

	  return out.toTensor();
	}