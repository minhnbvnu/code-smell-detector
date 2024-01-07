function nonMaxSuppressionV3$1(args) {
	  warn('tf.nonMaxSuppression() in webgl locks the UI thread. ' + 'Call tf.nonMaxSuppressionAsync() instead');
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var boxes = inputs.boxes,
	      scores = inputs.scores;
	  var maxOutputSize = attrs.maxOutputSize,
	      iouThreshold = attrs.iouThreshold,
	      scoreThreshold = attrs.scoreThreshold;
	  var boxesVals = backend.readSync(boxes.dataId);
	  var scoresVals = backend.readSync(scores.dataId);

	  var _nonMaxSuppressionV3I = nonMaxSuppressionV3Impl$2(boxesVals, scoresVals, maxOutputSize, iouThreshold, scoreThreshold),
	      selectedIndices = _nonMaxSuppressionV3I.selectedIndices;

	  return backend.makeTensorInfo([selectedIndices.length], 'int32', new Int32Array(selectedIndices));
	}