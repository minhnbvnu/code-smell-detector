function unpack$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var value = inputs.value;
	  var axis = attrs.axis;

	  if (axis < 0) {
	    axis += value.shape.length;
	  }

	  var valueRank = value.shape.length;
	  var num = value.shape[axis];
	  var outShape = new Array(valueRank - 1);
	  var outIndex = 0;

	  for (var i = 0; i < valueRank; i++) {
	    if (i !== axis) {
	      outShape[outIndex++] = value.shape[i];
	    }
	  }

	  var begin = new Array(valueRank).fill(0);
	  var size = value.shape.slice();
	  size[axis] = 1;
	  var res = new Array(num);

	  for (var _i = 0; _i < res.length; _i++) {
	    begin[axis] = _i;
	    var tempRes = slice$3({
	      inputs: {
	        x: value
	      },
	      backend: backend,
	      attrs: {
	        begin: begin,
	        size: size
	      }
	    });
	    res[_i] = reshape$2({
	      inputs: {
	        x: tempRes
	      },
	      backend: backend,
	      attrs: {
	        shape: outShape
	      }
	    });
	    backend.disposeIntermediateTensorInfo(tempRes);
	  }

	  return res;
	}