function collectGatherOpShapeInfo(x, indices, axis, batchDims) {
	  var indicesRank = indices.shape.length;
	  var xRank = x.shape.length;

	  if (batchDims !== 0) {
	    if (batchDims < -indicesRank || batchDims > indicesRank) {
	      throw new Error("Expect batchDims in the range of [-" + indicesRank + ", " + indicesRank + "], but got " + batchDims);
	    }
	  }

	  if (batchDims < 0) {
	    batchDims += indicesRank;
	  }

	  if (batchDims > xRank) {
	    throw new Error("batchDims (" + batchDims + ") must be less than rank(x) (\n    " + xRank + ").");
	  }

	  if (axis < batchDims) {
	    throw new Error("batchDims (" + batchDims + ") must be less than or equal to axis (" + axis + ").");
	  }

	  for (var i = 0; i < batchDims; ++i) {
	    if (x.shape[i] !== indices.shape[i]) {
	      throw new Error("x.shape[" + i + "]: " + x.shape[i] + " should be equal to indices.shape[" + i + "]: " + indices.shape[i] + ".");
	    }
	  }

	  var dimSize = x.shape[axis];
	  var outputShape = [];
	  var batchSize = 1;
	  var outerSize = 1;
	  var sliceSize = 1;

	  for (var _i = 0; _i < batchDims; ++_i) {
	    outputShape.push(x.shape[_i]);
	    batchSize *= x.shape[_i];
	  }

	  for (var _i2 = batchDims; _i2 < axis; _i2++) {
	    outputShape.push(x.shape[_i2]);
	    outerSize *= x.shape[_i2];
	  }

	  for (var _i3 = batchDims; _i3 < indicesRank; _i3++) {
	    outputShape.push(indices.shape[_i3]);
	  }

	  for (var _i4 = axis + 1; _i4 < xRank; _i4++) {
	    outputShape.push(x.shape[_i4]);
	    sliceSize *= x.shape[_i4];
	  }

	  return {
	    batchSize: batchSize,
	    sliceSize: sliceSize,
	    outerSize: outerSize,
	    dimSize: dimSize,
	    outputShape: outputShape
	  };
	}