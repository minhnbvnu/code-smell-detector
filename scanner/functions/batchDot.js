function batchDot(x, y, axes) {
	  if (x.shape.length > 3 || y.shape.length > 3) {
	    throw new NotImplementedError('batchDot is not implemented for tensors of 4D or higher rank yet');
	  }

	  assert(x.shape.length >= 2, function () {
	    return "batchDot requires the rank of x to be >= 2, " + ("but got " + x.shape.length);
	  });
	  assert(x.shape.length >= 2, function () {
	    return "batchDot requires the rank of y to be >= 2, " + ("but got " + y.shape.length);
	  });

	  if (typeof axes === 'number') {
	    axes = [axes, axes];
	  }

	  if (x.dtype === 'complex64' || y.dtype === 'complex64') {
	    throw new NotImplementedError('batchDot is not implemented for complex64-type Tensors yet.');
	  }

	  var xNDim = x.shape.length;
	  var yNDim = y.shape.length;

	  if (axes == null) {
	    // Behave like batchMatmul by default.
	    axes = [xNDim - 1, yNDim - 2];
	  }

	  var axesArray = axes;
	  return tidy(function () {
	    var diff;

	    if (xNDim > yNDim) {
	      diff = xNDim - yNDim;
	      var diffShape = [];

	      for (var i = 0; i < diff; ++i) {
	        diffShape.push(1);
	      }

	      y = y.reshape(y.shape.concat(diffShape));
	    } else if (yNDim > xNDim) {
	      diff = yNDim - xNDim;
	      var _diffShape = [];

	      for (var _i = 0; _i < diff; ++_i) {
	        _diffShape.push(1);
	      }

	      x = x.reshape(x.shape.concat(_diffShape));
	    } else {
	      diff = 0;
	    }

	    var out;

	    if (x.shape.length === 2 && y.shape.length === 2) {
	      if (axesArray[0] === axesArray[1]) {
	        out = x.mul(y).sum(axesArray[0]);
	      } else {
	        out = x.transpose([1, 0]).mul(y).sum(axesArray[1]);
	      }
	    } else {
	      var adjX = axesArray[0] !== x.shape.length - 1;
	      var adjY = axesArray[1] === y.shape.length - 1;
	      out = x.matMul(y, adjX, adjY);
	    }

	    if (diff > 0) {
	      var idx;

	      if (xNDim > yNDim) {
	        idx = xNDim + yNDim - 3;
	      } else {
	        idx = xNDim - 1;
	      }

	      var squeezeAxes = [];

	      for (var _i2 = idx; _i2 < idx + diff; ++_i2) {
	        squeezeAxes.push(_i2);
	      }

	      out = out.squeeze(squeezeAxes);
	    }

	    if (out.shape.length === 1) {
	      out = out.expandDims(1);
	    }

	    return out;
	  });
	}