function batchNorm_(x, mean, variance, offset, scale, varianceEpsilon) {
	  if (varianceEpsilon == null) {
	    varianceEpsilon = 0.001;
	  }

	  var $x = convertToTensor(x, 'x', 'batchNorm');
	  var $mean = convertToTensor(mean, 'mean', 'batchNorm');
	  var $variance = convertToTensor(variance, 'variance', 'batchNorm');
	  var $scale;

	  if (scale != null) {
	    $scale = convertToTensor(scale, 'scale', 'batchNorm');
	  }

	  var $offset;

	  if (offset != null) {
	    $offset = convertToTensor(offset, 'offset', 'batchNorm');
	  }

	  assert($mean.rank === $variance.rank, function () {
	    return 'Batch normalization gradient requires mean and variance to have ' + 'equal ranks.';
	  });
	  assert($offset == null || $mean.rank === $offset.rank, function () {
	    return 'Batch normalization gradient requires mean and offset to have ' + 'equal ranks.';
	  });
	  assert($scale == null || $mean.rank === $scale.rank, function () {
	    return 'Batch normalization gradient requires mean and scale to have ' + 'equal ranks.';
	  });
	  var x4D = xAs4D($x);
	  var inputs = {
	    x: x4D,
	    scale: $scale,
	    offset: $offset,
	    mean: $mean,
	    variance: $variance
	  };
	  var attrs = {
	    varianceEpsilon: varianceEpsilon
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(FusedBatchNorm, inputs, attrs);
	  return reshape(res, $x.shape);
	}