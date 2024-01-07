function maxPoolWithArgmaxImpl(xValues, xShape, dtype, includeBatchInIndex, convInfo) {
	  var strides = computeStrides(xShape);
	  var maxPools = pool$1(xValues, xShape, dtype, strides, convInfo, 'max');
	  var maxPositions = maxPoolPositions(xValues, xShape, dtype, convInfo, true, includeBatchInIndex);
	  return [maxPools.values, maxPositions.values];
	}