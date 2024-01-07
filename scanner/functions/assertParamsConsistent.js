function assertParamsConsistent(shapes, axis) {
	  var rank = shapes[0].length;
	  shapes.forEach(function (shape, i) {
	    assert(shape.length === rank, function () {
	      return "Error in concat" + rank + "D: rank of tensors[" + i + "] must be the same " + ("as the rank of the rest (" + rank + ")");
	    });
	  });
	  assert(axis >= 0 && axis < rank, function () {
	    return "Error in concat" + rank + "D: axis must be between 0 and " + (rank - 1) + ".";
	  });
	  var firstShape = shapes[0];
	  shapes.forEach(function (shape, i) {
	    for (var r = 0; r < rank; r++) {
	      assert(r === axis || shape[r] === firstShape[r], function () {
	        return "Error in concat" + rank + "D: Shape of tensors[" + i + "] (" + shape + ") " + ("does not match the shape of the rest (" + firstShape + ") ") + ("along the non-concatenated axis " + i + ".");
	      });
	    }
	  });
	}