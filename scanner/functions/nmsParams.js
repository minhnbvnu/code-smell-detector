function nmsParams(node, tensorMap, context) {
	  var boxes = getParamValue('boxes', node, tensorMap, context);
	  var scores = getParamValue('scores', node, tensorMap, context);
	  var maxOutputSize = getParamValue('maxOutputSize', node, tensorMap, context);
	  var iouThreshold = getParamValue('iouThreshold', node, tensorMap, context);
	  var scoreThreshold = getParamValue('scoreThreshold', node, tensorMap, context);
	  var softNmsSigma = getParamValue('softNmsSigma', node, tensorMap, context);
	  return {
	    boxes: boxes,
	    scores: scores,
	    maxOutputSize: maxOutputSize,
	    iouThreshold: iouThreshold,
	    scoreThreshold: scoreThreshold,
	    softNmsSigma: softNmsSigma
	  };
	}