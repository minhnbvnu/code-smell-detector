function oneHot$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var indices = inputs.indices;
	  var depth = attrs.depth,
	      onValue = attrs.onValue,
	      offValue = attrs.offValue;
	  assertNotComplex(indices, 'oneHot');
	  var indicesSize = sizeFromShape(indices.shape);
	  var res = new Float32Array(indicesSize * depth);
	  res.fill(offValue);
	  var indicesVal = backend.data.get(indices.dataId).values;

	  for (var event = 0; event < indicesSize; ++event) {
	    if (indicesVal[event] >= 0 && indicesVal[event] < depth) {
	      res[event * depth + indicesVal[event]] = onValue;
	    }
	  }

	  return backend.makeTensorInfo([].concat(indices.shape, [depth]), 'int32', res);
	}