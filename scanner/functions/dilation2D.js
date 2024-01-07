function dilation2D(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      filter = inputs.filter;
	  var strides = attrs.strides,
	      pad = attrs.pad,
	      dilations = attrs.dilations;
	  var convInfo = computeDilation2DInfo(x.shape, filter.shape, strides, pad, 'NHWC'
	  /* dataFormat */
	  , dilations);
	  var out;
	  var program = new Dilation2DProgram(convInfo);
	  out = backend.runWebGLProgram(program, [x, filter], 'float32');
	  var outReshaped = reshape$3({
	    inputs: {
	      x: out
	    },
	    backend: backend,
	    attrs: {
	      shape: convInfo.outShape
	    }
	  });
	  backend.disposeIntermediateTensorInfo(out);
	  return outReshaped;
	}