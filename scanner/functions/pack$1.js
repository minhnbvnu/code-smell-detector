function pack$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var axis = attrs.axis;

	  if (inputs.length === 1) {
	    return expandDims$2({
	      inputs: {
	        input: inputs[0]
	      },
	      backend: backend,
	      attrs: {
	        dim: axis
	      }
	    });
	  }

	  var shape = inputs[0].shape;
	  var dtype = inputs[0].dtype;
	  inputs.forEach(function (t) {
	    assertShapesMatch(shape, t.shape, 'All tensors passed to stack must have matching shapes');
	    assert(dtype === t.dtype, function () {
	      return 'All tensors passed to stack must have matching dtypes';
	    });
	  });
	  var intermediateTensorInfos = [];
	  var expandedTensors = inputs.map(function (t) {
	    var expandedT = expandDims$2({
	      inputs: {
	        input: t
	      },
	      backend: backend,
	      attrs: {
	        dim: axis
	      }
	    });
	    intermediateTensorInfos.push(expandedT);
	    return expandedT;
	  });
	  var result = concat$1({
	    inputs: expandedTensors,
	    backend: backend,
	    attrs: {
	      axis: axis
	    }
	  });
	  intermediateTensorInfos.forEach(function (t) {
	    return backend.disposeIntermediateTensorInfo(t);
	  });
	  return result;
	}