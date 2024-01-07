function dot$1(a, b, activation, bias) {
	  if (a.rank < 2 || b.rank < 2) {
	    throw new NotImplementedError("dot requires both inputs to be rank >= 2" + (" but got x shape = " + a.shape + " and y shape = " + b.shape));
	  }

	  if (b.rank >= 3) {
	    var xLastDim = a.shape.slice(-1)[0];
	    var ySecondLastDim = b.shape.slice(-2)[0];

	    if (xLastDim !== ySecondLastDim) {
	      throw new NotImplementedError("If rank y >= 3, then the second last dim" + (" of y must equal the last dim of x but got x shape = " + a.shape + " and ") + (" y shape = " + b.shape));
	    }
	  } // Handle basic 2D x 2D case.


	  if (a.rank === 2 && b.rank === 2) {
	    var transposeA = false;
	    var transposeB = false; // tfc.fused.matMul only fuses certain activation functions. Unsupported
	    // activation functions are treated as 'linear' activations, which is
	    // equivalent to a no-op.

	    return matMul$1({
	      a: a,
	      b: b,
	      transposeA: transposeA,
	      transposeB: transposeB,
	      bias: bias ? reshapeBias(a.rank, bias, imageDataFormat()) : null,
	      activation: activation
	    });
	  } else {
	    // Reshape x into the analogous 2D Tensor.
	    var aFirstDims = a.shape.slice(); // Holds all but the last dim of x.

	    var aLastDim = aFirstDims.pop();
	    a = a.reshape([-1, aLastDim]); // Reshape y into the analogous 2D Tensor, and keep track of the
	    // required dimensions to reproduce the output shape.

	    var bShape = b.shape.slice();
	    var bLastDim = bShape.pop();

	    var _ySecondLastDim = bShape.pop();

	    var yOtherDims = [].concat(bShape, [bLastDim]); // permutation should be like [r-2, 0, 1, 2, ... r-4, r-3, r-1]
	    // where r is the rank of y.

	    var perm = Array.from({
	      length: b.rank
	    }, function (_, i) {
	      if (i === 0) {
	        return b.rank - 2;
	      } else if (i <= b.rank - 2) {
	        return i - 1;
	      }

	      return i;
	    });
	    b = b.transpose(perm).reshape([_ySecondLastDim, -1]); // Multiply x and y as 2D Tensors, and then reshape back to original.

	    var outputShape = [].concat(aFirstDims, yOtherDims);
	    var _transposeA = false;
	    var _transposeB = false;
	    return matMul$1({
	      a: a,
	      b: b,
	      transposeA: _transposeA,
	      transposeB: _transposeB,
	      bias: bias ? reshapeBias(a.rank, bias, imageDataFormat()) : null,
	      activation: activation
	    }).reshape(outputShape);
	  }
	}