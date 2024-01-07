function nonMaxSuppressionV4(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var boxes = inputs.boxes,
	      scores = inputs.scores;
	  var maxOutputSize = attrs.maxOutputSize,
	      iouThreshold = attrs.iouThreshold,
	      scoreThreshold = attrs.scoreThreshold,
	      padToMaxOutputSize = attrs.padToMaxOutputSize;
	  assertNotComplex(boxes, 'NonMaxSuppressionPadded');
	  var boxesVals = backend.data.get(boxes.dataId).values;
	  var scoresVals = backend.data.get(scores.dataId).values;

	  var _nonMaxSuppressionV4I = nonMaxSuppressionV4Impl$1(boxesVals, scoresVals, maxOutputSize, iouThreshold, scoreThreshold, padToMaxOutputSize),
	      selectedIndices = _nonMaxSuppressionV4I.selectedIndices,
	      validOutputs = _nonMaxSuppressionV4I.validOutputs;

	  return [backend.makeTensorInfo([selectedIndices.length], 'int32', new Int32Array(selectedIndices)), backend.makeTensorInfo([], 'int32', new Int32Array([validOutputs]))];
	}