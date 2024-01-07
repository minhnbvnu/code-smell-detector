function nonMaxSuppressionV5(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var boxes = inputs.boxes,
	      scores = inputs.scores;
	  var maxOutputSize = attrs.maxOutputSize,
	      iouThreshold = attrs.iouThreshold,
	      scoreThreshold = attrs.scoreThreshold,
	      softNmsSigma = attrs.softNmsSigma;
	  assertNotComplex(boxes, 'NonMaxSuppressionWithScore');
	  var boxesVals = backend.data.get(boxes.dataId).values;
	  var scoresVals = backend.data.get(scores.dataId).values;
	  var maxOutputSizeVal = maxOutputSize;
	  var iouThresholdVal = iouThreshold;
	  var scoreThresholdVal = scoreThreshold;
	  var softNmsSigmaVal = softNmsSigma;

	  var _nonMaxSuppressionV5I = nonMaxSuppressionV5Impl$1(boxesVals, scoresVals, maxOutputSizeVal, iouThresholdVal, scoreThresholdVal, softNmsSigmaVal),
	      selectedIndices = _nonMaxSuppressionV5I.selectedIndices,
	      selectedScores = _nonMaxSuppressionV5I.selectedScores;

	  return [backend.makeTensorInfo([selectedIndices.length], 'int32', new Int32Array(selectedIndices)), backend.makeTensorInfo([selectedScores.length], 'float32', new Float32Array(selectedScores))];
	}