function gatherDropNegatives(x, indices) {
	  // Helper function for unsorted segment ops. Gathers params for
	  // positive segment ids and gathers 0 for inputs with negative segment id.
	  // Mirrors _GatherDropNegatives from tensorflow/python/ops/math_grad.py
	  var zeroClippedIndices = maximum(indices, zerosLike(indices));
	  var gathered = gather(x, zeroClippedIndices);
	  var isPositive = greaterEqual(indices, scalar(0, 'int32'));
	  var numIters = gathered.rank - isPositive.rank;

	  for (var i = 0; i < numIters; ++i) {
	    isPositive = expandDims(isPositive, i + 1);
	  }

	  isPositive = logicalAnd(isPositive, ones$1(gathered.shape, 'bool'));
	  var zeroSlice = zerosLike(gathered);
	  return where(isPositive, gathered, zeroSlice);
	}