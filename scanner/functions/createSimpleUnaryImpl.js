function createSimpleUnaryImpl(op) {
	  return function (values, dtype, attrs) {
	    var newValues = getTypedArrayFromDType(dtype, values.length);

	    for (var i = 0; i < values.length; ++i) {
	      newValues[i] = op(values[i], attrs);
	    }

	    return newValues;
	  };
	}