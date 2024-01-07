function identity$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var x = inputs.x;
	  backend.incRef(x.dataId);
	  return {
	    dataId: x.dataId,
	    shape: x.shape,
	    dtype: x.dtype
	  };
	}