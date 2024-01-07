function createNestedArray(offset, shape, a) {
	  var ret = new Array();

	  if (shape.length === 1) {
	    var d = shape[0];

	    for (var i = 0; i < d; i++) {
	      ret[i] = a[offset + i];
	    }
	  } else {
	    var _d = shape[0];
	    var rest = shape.slice(1);
	    var len = rest.reduce(function (acc, c) {
	      return acc * c;
	    });

	    for (var _i = 0; _i < _d; _i++) {
	      ret[_i] = createNestedArray(offset + _i * len, rest, a);
	    }
	  }

	  return ret;
	}