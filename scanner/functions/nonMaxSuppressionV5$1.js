function nonMaxSuppressionV5$1(args) {
	  warn('tf.nonMaxSuppression() in webgl locks the UI thread. ' + 'Call tf.nonMaxSuppressionAsync() instead');
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var boxes = inputs.boxes,
	      scores = inputs.scores;
	  var maxOutputSize = attrs.maxOutputSize,
	      iouThreshold = attrs.iouThreshold,
	      scoreThreshold = attrs.scoreThreshold,
	      softNmsSigma = attrs.softNmsSigma;
	  var boxesVals = backend.readSync(boxes.dataId);
	  var scoresVals = backend.readSync(scores.dataId);
	  var maxOutputSizeVal = maxOutputSize;
	  var iouThresholdVal = iouThreshold;
	  var scoreThresholdVal = scoreThreshold;
	  var softNmsSigmaVal = softNmsSigma;

	  var _nonMaxSuppressionV5I = nonMaxSuppressionV5Impl$2(boxesVals, scoresVals, maxOutputSizeVal, iouThresholdVal, scoreThresholdVal, softNmsSigmaVal),
	      selectedIndices = _nonMaxSuppressionV5I.selectedIndices,
	      selectedScores = _nonMaxSuppressionV5I.selectedScores;

	  return [backend.makeTensorInfo([selectedIndices.length], 'int32', new Int32Array(selectedIndices)), backend.makeTensorInfo([selectedScores.length], 'float32', new Float32Array(selectedScores))];
	}