function backpropagateGradients(tensorAccumulatedGradientMap, filteredTape, tidy, add) {
	  var _loop = function _loop(i) {
	    var node = filteredTape[i];
	    var dys = [];
	    node.outputs.forEach(function (o) {
	      var gradTensor = tensorAccumulatedGradientMap[o.id];

	      if (gradTensor != null) {
	        dys.push(gradTensor);
	      } else {
	        // This particular output is not in the back-propagation subgraph, so it
	        // does not affect the final output, thus we put null for its dy.
	        dys.push(null);
	      }
	    });

	    if (node.gradient == null) {
	      throw new Error("Cannot compute gradient: gradient function not found " + ("for " + node.kernelName + "."));
	    } // Backprop dy through this node and accumulate gradients over the inputs.


	    var inputGradients = node.gradient(dys);

	    var _loop2 = function _loop2(inputName) {
	      if (!(inputName in inputGradients)) {
	        throw new Error("Cannot backprop through input " + inputName + ". " + ("Available gradients found: " + Object.keys(inputGradients) + "."));
	      } // Call the gradient function.


	      var dx = tidy(function () {
	        return inputGradients[inputName]();
	      });

	      if (dx.dtype !== 'float32') {
	        throw new Error("Error in gradient for op " + node.kernelName + ". The gradient of input " + (inputName + " must have 'float32' dtype, but has '" + dx.dtype + "'"));
	      }

	      var x = node.inputs[inputName];

	      if (!arraysEqual(dx.shape, x.shape)) {
	        throw new Error("Error in gradient for op " + node.kernelName + ". The gradient of input " + ("'" + inputName + "' has shape '" + dx.shape + "', which does not match ") + ("the shape of the input '" + x.shape + "'"));
	      }

	      if (tensorAccumulatedGradientMap[x.id] == null) {
	        tensorAccumulatedGradientMap[x.id] = dx;
	      } else {
	        var curGradient = tensorAccumulatedGradientMap[x.id];
	        tensorAccumulatedGradientMap[x.id] = add(curGradient, dx);
	        curGradient.dispose();
	      }
	    };

	    for (var inputName in node.inputs) {
	      _loop2(inputName);
	    }
	  };

	  // Walk the tape backward and keep a map of Tensor to its gradient.
	  for (var i = filteredTape.length - 1; i >= 0; i--) {
	    _loop(i);
	  }
	}