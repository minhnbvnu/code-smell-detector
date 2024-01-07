function ensureTensorsRank2OrHigher(tensors) {
	  var outs = [];

	  if (tensors instanceof Tensor) {
	    tensors = [tensors];
	  } // Make Tensors at least 2D.


	  for (var i = 0; i < tensors.length; ++i) {
	    var tensor = tensors[i];

	    if (tensor.rank === 1) {
	      outs.push(expandDims$1(tensor, 1));
	    } else if (tensor.rank === 0) {
	      throw new Error('Expected tensor to be at least 1D, but received a 0D tensor ' + '(scalar).');
	    } else {
	      outs.push(tensor);
	    }
	  }

	  return outs;
	}