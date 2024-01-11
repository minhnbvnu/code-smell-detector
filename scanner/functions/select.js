function select(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var condition = inputs.condition,
	      t = inputs.t,
	      e = inputs.e;
	  assertNotComplex([condition, t, e], 'select');
	  var conditionRank = condition.shape.length;
	  var values = backend.data.get(condition.dataId).values;
	  var tValues = backend.data.get(t.dataId).values;
	  var eValues = backend.data.get(e.dataId).values;
	  var resultDtype = upcastType(t.dtype, e.dtype);
	  var newValues = makeZerosTypedArray(sizeFromShape(t.shape), resultDtype);
	  var index = 0;
	  var offset = conditionRank === 0 || conditionRank > 1 || t.shape.length === 1 ? 1 : sizeFromShape(t.shape.slice(1));

	  for (var i = 0; i < values.length; i++) {
	    for (var j = 0; j < offset; j++) {
	      if (values[i] === 1) {
	        newValues[index++] = tValues[i];
	      } else {
	        newValues[index++] = eValues[i];
	      }
	    }
	  }

	  return backend.makeTensorInfo(t.shape, resultDtype, newValues);
	}