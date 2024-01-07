function topK$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var k = attrs.k,
	      sorted = attrs.sorted;
	  var xVals = backend.readSync(x.dataId);

	  var _topKImplCPU = topKImplCPU(xVals, x.shape, x.dtype, k, sorted),
	      allTopKVals = _topKImplCPU[0],
	      allTopKIndices = _topKImplCPU[1];

	  return [backend.makeTensorInfo(allTopKVals.shape, allTopKVals.dtype, allTopKVals.values), backend.makeTensorInfo(allTopKIndices.shape, allTopKIndices.dtype, allTopKIndices.values)];
	}