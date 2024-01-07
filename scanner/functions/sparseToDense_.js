function sparseToDense_(sparseIndices, sparseValues, outputShape, defaultValue) {
	  if (defaultValue === void 0) {
	    defaultValue = 0;
	  }

	  var $sparseIndices = convertToTensor(sparseIndices, 'sparseIndices', 'sparseToDense', 'int32');
	  var $sparseValues = convertToTensor(sparseValues, 'sparseValues', 'sparseToDense');
	  var $defaultValue = convertToTensor(defaultValue, 'defaultValue', 'sparseToDense', $sparseValues.dtype);
	  validateInput$1($sparseIndices, $sparseValues, outputShape, $defaultValue);
	  var inputs = {
	    sparseIndices: $sparseIndices,
	    sparseValues: $sparseValues,
	    defaultValue: $defaultValue
	  };
	  var attrs = {
	    outputShape: outputShape
	  };
	  return ENGINE.runKernel(SparseToDense, inputs, attrs);
	}