function batchNorm3d_(x, mean, variance, offset, scale, varianceEpsilon) {
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

	  assert($x.rank === 3, function () {
	    return "Error in batchNorm3D: x must be rank 3 but got rank " + ($x.rank + ".");
	  });
	  assert($mean.rank === 3 || $mean.rank === 1, function () {
	    return "Error in batchNorm3D: mean must be rank 3 or rank 1 but " + ("got rank " + $mean.rank + ".");
	  });
	  assert($variance.rank === 3 || $variance.rank === 1, function () {
	    return "Error in batchNorm3D: variance must be rank 3 or rank 1 " + ("but got rank " + $variance.rank + ".");
	  });

	  if ($scale != null) {
	    assert($scale.rank === 3 || $scale.rank === 1, function () {
	      return "Error in batchNorm3D: scale must be rank 3 or rank 1 " + ("but got rank " + $scale.rank + ".");
	    });
	  }

	  if ($offset != null) {
	    assert($offset.rank === 3 || $offset.rank === 1, function () {
	      return "Error in batchNorm3D: offset must be rank 3 or rank 1 " + ("but got rank " + $offset.rank + ".");
	    });
	  }

	  return batchNorm($x, $mean, $variance, $offset, $scale, varianceEpsilon);
	}