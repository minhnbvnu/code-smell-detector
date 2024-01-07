function nonMaxSuppressionV3(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var boxes = inputs.boxes,
	      scores = inputs.scores;
	  var maxOutputSize = attrs.maxOutputSize,
	      iouThreshold = attrs.iouThreshold,
	      scoreThreshold = attrs.scoreThreshold;
	  assertNotComplex(boxes, 'NonMaxSuppression');
	  var boxesVals = backend.data.get(boxes.dataId).values;
	  var scoresVals = backend.data.get(scores.dataId).values;

	  var _nonMaxSuppressionV3I = nonMaxSuppressionV3Impl$1(boxesVals, scoresVals, maxOutputSize, iouThreshold, scoreThreshold),
	      selectedIndices = _nonMaxSuppressionV3I.selectedIndices;

	  return backend.makeTensorInfo([selectedIndices.length], 'int32', new Int32Array(selectedIndices));
	}