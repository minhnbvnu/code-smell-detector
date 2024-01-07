function topK(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var k = attrs.k,
	      sorted = attrs.sorted;
	  assertNotComplex(x, 'topk');
	  var xVals = backend.data.get(x.dataId).values;

	  var _topKImpl = topKImpl(xVals, x.shape, x.dtype, k, sorted),
	      allTopKVals = _topKImpl[0],
	      allTopKIndices = _topKImpl[1];

	  return [backend.makeTensorInfo(allTopKVals.shape, allTopKVals.dtype, allTopKVals.values), backend.makeTensorInfo(allTopKIndices.shape, allTopKIndices.dtype, allTopKIndices.values)];
	}