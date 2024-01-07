function batchNorm2d_(x, mean, variance, offset, scale, varianceEpsilon) {
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

	  assert($x.rank === 2, function () {
	    return "Error in batchNorm2D: x must be rank 2 but got rank " + ($x.rank + ".");
	  });
	  assert($mean.rank === 2 || $mean.rank === 1, function () {
	    return "Error in batchNorm2D: mean must be rank 2 or rank 1 but " + ("got rank " + $mean.rank + ".");
	  });
	  assert($variance.rank === 2 || $variance.rank === 1, function () {
	    return "Error in batchNorm2D: variance must be rank 2 or rank 1 " + ("but got rank " + $variance.rank + ".");
	  });

	  if ($scale != null) {
	    assert($scale.rank === 2 || $scale.rank === 1, function () {
	      return "Error in batchNorm2D: scale must be rank 2 or rank 1 " + ("but got rank " + $scale.rank + ".");
	    });
	  }

	  if ($offset != null) {
	    assert($offset.rank === 2 || $offset.rank === 1, function () {
	      return "Error in batchNorm2D: offset must be rank 2 or rank 1 " + ("but got rank " + $offset.rank + ".");
	    });
	  }

	  return batchNorm($x, $mean, $variance, $offset, $scale, varianceEpsilon);
	}