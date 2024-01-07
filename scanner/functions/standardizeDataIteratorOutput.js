function standardizeDataIteratorOutput( // Type `model` as `any` here to avoid circular dependency w/
	// training.ts.
	// tslint:disable-next-line:no-any
	model, iteratorOut) {
	  var xs;
	  var ys;
	  var iteratorOutObj = iteratorOut;
	  xs = iteratorOutObj['xs'];
	  ys = iteratorOutObj['ys'];
	  assert(xs != null && ys != null, function () {
	    return 'A Dataset iterator for fitDataset() is expected to generate ' + 'objects of the form `{xs: xVal, ys: yVal}`, where the two ' + 'values may be `tf.Tensor`, an array of Tensors, or a map of ' + 'string to Tensor.  The provided Dataset instead generates ' + ("" + iteratorOut);
	  });
	  var flattenedXs = flattenTensorOrArrayOrMap('input', model.inputNames, xs);
	  var flattenedYs = flattenTensorOrArrayOrMap('output', model.outputNames, ys);
	  var batchSize = flattenedXs[0].shape[0];
	  assert(flattenedXs.length === model.inputs.length, function () {
	    return "LayersModel has " + model.inputs.length + " inputs, but the dataset " + ("provides " + flattenedXs.length + " inputs.  (Expected input keys: ") + (JSON.stringify(model.inputNames) + ")");
	  });
	  assert(flattenedYs.length === model.outputs.length, function () {
	    return "LayersModel has " + model.outputs.length + " outputs, but the dataset " + ("provides " + flattenedYs.length + " outputs.  (Expected output keys: ") + (JSON.stringify(model.outputNames) + ")");
	  });

	  var _loop = function _loop(xIndex) {
	    assert(flattenedXs[xIndex].shape[0] === batchSize, function () {
	      return "Batch size mismatch: input " + (model.inputNames[xIndex] + " has " + flattenedXs[xIndex].shape[0] + "; ") + ("expected  " + batchSize + " based on input " + model.inputNames[0] + ".");
	    });
	  };

	  for (var xIndex = 0; xIndex < flattenedXs.length; xIndex++) {
	    _loop(xIndex);
	  }

	  var _loop2 = function _loop2(yIndex) {
	    assert(flattenedYs[yIndex].shape[0] === batchSize, function () {
	      return "Batch size mismatch: output " + (model.outputNames[yIndex] + " has " + flattenedYs[yIndex].shape[0] + "; ") + ("expected  " + batchSize + " based on input " + model.inputNames[0] + ".");
	    });
	  };

	  for (var yIndex = 0; yIndex < flattenedYs.length; yIndex++) {
	    _loop2(yIndex);
	  }

	  return {
	    xs: flattenedXs,
	    ys: flattenedYs
	  };
	}