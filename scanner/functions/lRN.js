function lRN(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var depthRadius = attrs.depthRadius,
	      bias = attrs.bias,
	      alpha = attrs.alpha,
	      beta = attrs.beta;
	  assertNotComplex(x, 'LRN');
	  var channels = x.shape[3];
	  var maxD = channels - 1;
	  var xValues = backend.data.get(x.dataId).values;
	  var size = sizeFromShape(x.shape);
	  var result = new Float32Array(size);

	  function sumAcrossChannels(offset) {
	    var currentChannel = offset % channels;
	    var beginSumOffset = offset - currentChannel + Math.max(0, currentChannel - depthRadius);
	    var endSumOffset = offset - currentChannel + Math.min(currentChannel + depthRadius, maxD);
	    var sum = 0.0;

	    for (; beginSumOffset <= endSumOffset; beginSumOffset++) {
	      var z = xValues[beginSumOffset];
	      sum += z * z;
	    }

	    return sum;
	  }

	  for (var offset = 0; offset < size; offset++) {
	    var sum = sumAcrossChannels(offset);
	    var val = xValues[offset] * Math.pow(bias + alpha * sum, -beta);
	    result[offset] = val;
	  }

	  return backend.makeTensorInfo(x.shape, x.dtype, result);
	}