function tile_(x, reps) {
	  var $x = convertToTensor(x, 'x', 'tile', 'string_or_numeric');
	  assert($x.rank === reps.length, function () {
	    return "Error in transpose: rank of input " + $x.rank + " " + ("must match length of reps " + reps + ".");
	  });
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    reps: reps
	  };
	  return ENGINE.runKernel(Tile, inputs, attrs);
	}