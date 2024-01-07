function unpack$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var value = inputs.value;
	  var axis = attrs.axis;

	  if (axis < 0) {
	    axis += value.shape.length;
	  }

	  var x = value;
	  var xRank = x.shape.length;
	  var num = value.shape[axis];
	  var outShape = new Array(xRank - 1);
	  var outIndex = 0;

	  for (var i = 0; i < xRank; i++) {
	    if (i !== axis) {
	      outShape[outIndex++] = x.shape[i];
	    }
	  }

	  var toDispose = [];
	  var begin = new Array(xRank).fill(0);
	  var size = x.shape.slice();
	  size[axis] = 1;
	  var res = new Array(num);

	  for (var _i = 0; _i < res.length; _i++) {
	    begin[axis] = _i;
	    var sliced = slice$4({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        begin: begin,
	        size: size
	      }
	    });
	    var reshaped = reshape$3({
	      inputs: {
	        x: sliced
	      },
	      backend: backend,
	      attrs: {
	        shape: outShape
	      }
	    });
	    res[_i] = reshaped;
	    toDispose.push(sliced);
	  }

	  toDispose.forEach(function (t) {
	    return backend.disposeIntermediateTensorInfo(t);
	  });
	  return res;
	}