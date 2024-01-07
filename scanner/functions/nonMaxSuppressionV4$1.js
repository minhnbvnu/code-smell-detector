function nonMaxSuppressionV4$1(args) {
	  warn('tf.nonMaxSuppression() in webgl locks the UI thread. ' + 'Call tf.nonMaxSuppressionAsync() instead');
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var boxes = inputs.boxes,
	      scores = inputs.scores;
	  var maxOutputSize = attrs.maxOutputSize,
	      iouThreshold = attrs.iouThreshold,
	      scoreThreshold = attrs.scoreThreshold,
	      padToMaxOutputSize = attrs.padToMaxOutputSize;
	  var boxesVals = backend.readSync(boxes.dataId);
	  var scoresVals = backend.readSync(scores.dataId);

	  var _nonMaxSuppressionV4I = nonMaxSuppressionV4Impl$2(boxesVals, scoresVals, maxOutputSize, iouThreshold, scoreThreshold, padToMaxOutputSize),
	      selectedIndices = _nonMaxSuppressionV4I.selectedIndices,
	      validOutputs = _nonMaxSuppressionV4I.validOutputs;

	  return [backend.makeTensorInfo([selectedIndices.length], 'int32', new Int32Array(selectedIndices)), backend.makeTensorInfo([], 'int32', new Int32Array([validOutputs]))];
	}