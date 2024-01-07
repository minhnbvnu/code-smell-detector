function broadcastTo_(x, shape) {
	  var input = convertToTensor(x, 'broadcastTo', 'x');
	  var xShape = input.shape;

	  if (shape.some(function (d) {
	    return !(d > 0) || d % 1 !== 0;
	  })) {
	    throw new Error("broadcastTo(): Invalid broadcast shape [" + shape + "].");
	  }

	  if (shape.length < input.rank) {
	    throw new Error("broadcastTo(): shape.length=" + shape.length + " < input.rank=" + input.rank + ".");
	  }

	  if (shape.length > input.rank) {
	    var newShape = input.shape.slice();

	    while (newShape.length < shape.length) {
	      newShape.unshift(1);
	    }

	    input = reshape(input, newShape);
	  }

	  var inputShape = input.shape;
	  var reps = Array.from(shape);

	  for (var i = shape.length - 1; i >= 0; i--) {
	    if (inputShape[i] === shape[i]) {
	      reps[i] = 1;
	    } else if (input.shape[i] !== 1) {
	      throw new Error("broadcastTo(): [" + xShape + "] cannot be broadcast to [" + shape + "].");
	    }
	  }

	  var axes = reps.map(function (n, i) {
	    return n > 1 ? i : -1;
	  }).filter(function (i) {
	    return i >= 0;
	  });

	  if (axes.length === 0) {
	    return clone(input);
	  } // TODO call broadcastTo kernel directly once backends implement broadcstTo


	  var inputs = {
	    x: input
	  };
	  var attrs = {
	    reps: reps
	  };
	  return ENGINE.runKernel(Tile, inputs, attrs);
	}