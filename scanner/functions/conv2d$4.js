function conv2d$4(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      filter = inputs.filter;
	  var strides = attrs.strides,
	      pad = attrs.pad,
	      dataFormat = attrs.dataFormat,
	      dilations = attrs.dilations,
	      dimRoundingMode = attrs.dimRoundingMode;
	  var $dataFormat = convertConv2DDataFormat(dataFormat);
	  var convInfo = computeConv2DInfo(x.shape, filter.shape, strides, dilations, pad, dimRoundingMode, false
	  /* depthwise */
	  , $dataFormat);
	  var out;

	  if (convInfo.filterHeight === 1 && convInfo.filterWidth === 1 && convInfo.dilationHeight === 1 && convInfo.dilationWidth === 1 && convInfo.strideHeight === 1 && convInfo.strideWidth === 1 && (convInfo.padInfo.type === 'SAME' || convInfo.padInfo.type === 'VALID')) {
	    out = conv2dByMatMul({
	      x: x,
	      filter: filter,
	      convInfo: convInfo,
	      backend: backend
	    });
	  } else if (env().getBool('WEBGL_CONV_IM2COL') && x.shape[0] === 1) {
	    out = conv2dWithIm2Row({
	      x: x,
	      filter: filter,
	      convInfo: convInfo,
	      backend: backend
	    });
	  } else {
	    var program = new Conv2DProgram(convInfo);
	    out = backend.runWebGLProgram(program, [x, filter], 'float32');
	  }

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