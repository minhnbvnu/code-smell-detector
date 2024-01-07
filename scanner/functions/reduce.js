function reduce(x, dtype, reductionType, backend) {
	  var reductionStages = getReductionStages(x.shape);
	  var result = x;

	  for (var i = 0; i < reductionStages.length; i++) {
	    var _reductionStages$i = reductionStages[i],
	        inSize = _reductionStages$i.inSize,
	        windowSize = _reductionStages$i.windowSize,
	        outSize = _reductionStages$i.outSize;
	    var program = void 0;
	    var previousResult = void 0;

	    if (reductionType === 'mean') {
	      program = i === 0 ? new MeanProgram({
	        windowSize: windowSize,
	        inSize: inSize,
	        batchSize: x.shape[0],
	        outSize: outSize
	      }, inSize) : new MeanProgram({
	        windowSize: windowSize,
	        inSize: inSize,
	        batchSize: x.shape[0],
	        outSize: outSize
	      });
	    } else {
	      program = new ReduceProgram({
	        windowSize: windowSize,
	        inSize: inSize,
	        batchSize: x.shape[0],
	        outSize: outSize
	      }, reductionType);
	    }

	    previousResult = result;
	    result = backend.runWebGLProgram(program, [result], dtype);

	    if (previousResult.dataId !== x.dataId) {
	      backend.disposeIntermediateTensorInfo(previousResult);
	    }
	  }

	  return result;
	}