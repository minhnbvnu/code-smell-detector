function lRNGrad(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      y = inputs.y,
	      dy = inputs.dy;
	  var depthRadius = attrs.depthRadius,
	      bias = attrs.bias,
	      alpha = attrs.alpha,
	      beta = attrs.beta;
	  assertNotComplex(dy, 'LRNGrad');
	  var dySize = sizeFromShape(dy.shape);
	  var channels = dy.shape[3];
	  var dyValues = backend.data.get(dy.dataId).values;
	  var xValues = backend.data.get(x.dataId).values;
	  var yValues = backend.data.get(y.dataId).values;
	  var result = new Float32Array(dySize);
	  var size = dySize;

	  for (var offset = 0; offset < size; offset++) {
	    var currentChannel = offset % channels;
	    var depthBegin = offset - currentChannel + Math.max(0, currentChannel - depthRadius);
	    var depthEnd = offset - currentChannel + Math.min(channels, currentChannel + depthRadius + 1);
	    var norm = 0;

	    for (var k = depthBegin; k < depthEnd; k++) {
	      norm += Math.pow(xValues[k], 2);
	    }

	    norm = alpha * norm + bias;

	    for (var _k = depthBegin; _k < depthEnd; _k++) {
	      var dyi = -2 * alpha * beta * xValues[_k] * yValues[offset] / norm;

	      if (offset === _k) {
	        dyi += Math.pow(norm, -beta);
	      }

	      dyi *= dyValues[offset];
	      result[_k] += dyi;
	    }
	  }

	  return backend.makeTensorInfo(dy.shape, x.dtype, result);
	}