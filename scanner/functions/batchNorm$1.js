function batchNorm$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      scale = inputs.scale,
	      offset = inputs.offset,
	      mean = inputs.mean,
	      variance = inputs.variance;
	  assert(mean.shape.length === variance.shape.length, function () {
	    return 'Batch normalization gradient requires mean and variance to have ' + 'equal ranks.';
	  });
	  assert(offset == null || mean.shape.length === offset.shape.length, function () {
	    return 'Batch normalization gradient requires mean and offset to have ' + 'equal ranks.';
	  });
	  assert(scale == null || mean.shape.length === scale.shape.length, function () {
	    return 'Batch normalization gradient requires mean and scale to have ' + 'equal ranks.';
	  });
	  assertNotComplex([x, mean, variance, scale, offset], 'batchNorm');
	  var varianceEpsilon = attrs.varianceEpsilon;

	  if (varianceEpsilon == null) {
	    varianceEpsilon = 0.001;
	  }

	  var xVals = backend.data.get(x.dataId).values;
	  var mVals = backend.data.get(mean.dataId).values;
	  var varVals = backend.data.get(variance.dataId).values;
	  var sVals = scale ? backend.data.get(scale.dataId).values : new Float32Array([1]);
	  var offVals = offset ? backend.data.get(offset.dataId).values : new Float32Array([0]);
	  var outVals = new Float32Array(xVals.length);
	  var offValsLength = offVals.length;
	  var sValsLength = sVals.length;
	  var varValsLength = varVals.length;
	  var mValsLength = mVals.length;
	  var offi = 0;
	  var mi = 0;
	  var si = 0;
	  var vi = 0;

	  for (var i = 0; i < xVals.length; ++i) {
	    outVals[i] = offVals[offi++] + (xVals[i] - mVals[mi++]) * sVals[si++] / Math.sqrt(varVals[vi++] + varianceEpsilon);

	    if (offi >= offValsLength) {
	      offi = 0;
	    }

	    if (mi >= mValsLength) {
	      mi = 0;
	    }

	    if (si >= sValsLength) {
	      si = 0;
	    }

	    if (vi >= varValsLength) {
	      vi = 0;
	    }
	  }

	  return backend.makeTensorInfo(x.shape, x.dtype, outVals);
	}