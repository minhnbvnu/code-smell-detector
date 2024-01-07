function conv2dByMatMul(_ref) {
	  var x = _ref.x,
	      filter = _ref.filter,
	      convInfo = _ref.convInfo,
	      backend = _ref.backend,
	      _ref$bias = _ref.bias,
	      bias = _ref$bias === void 0 ? null : _ref$bias,
	      _ref$preluActivationW = _ref.preluActivationWeights,
	      preluActivationWeights = _ref$preluActivationW === void 0 ? null : _ref$preluActivationW,
	      _ref$leakyreluAlpha = _ref.leakyreluAlpha,
	      leakyreluAlpha = _ref$leakyreluAlpha === void 0 ? 0 : _ref$leakyreluAlpha,
	      _ref$activation = _ref.activation,
	      activation = _ref$activation === void 0 ? null : _ref$activation;
	  // Reshapes conv2D input to 2D tensors, uses matMul and then reshape the
	  // result from 2D to 4D.
	  var xShape = x.shape;
	  var xTexData = backend.texData.get(x.dataId);
	  var sharedMatMulDim = convInfo.inChannels;
	  var outerShapeX = xShape[0] * xShape[1] * xShape[2];
	  var outerShapeFilter = convInfo.outChannels;
	  var isChannelsLast = convInfo.dataFormat === 'channelsLast';
	  var transposeA = false;
	  var transposeB = false;
	  var out;
	  var intermediates = []; // TODO: Once reduction ops are packed, batchMatMul will always be packed
	  // and we can remove this condition.

	  var batchMatMulWillBeUnpacked = (outerShapeX === 1 || outerShapeFilter === 1) && sharedMatMulDim > MATMUL_SHARED_DIM_THRESHOLD;
	  var reshapeWillBeExpensive = xShape[2] % 2 !== 0 && !!xTexData.isPacked;

	  if (batchMatMulWillBeUnpacked || !env().getBool('WEBGL_LAZILY_UNPACK') || !env().getBool('WEBGL_PACK_BINARY_OPERATIONS') || !reshapeWillBeExpensive) {
	    var targetShape = isChannelsLast ? xShape[0] * xShape[1] * xShape[2] : xShape[0] * xShape[2] * xShape[3];
	    var xReshaped = reshape$3({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        shape: [1, targetShape, convInfo.inChannels]
	      }
	    });
	    var filterReshaped = reshape$3({
	      inputs: {
	        x: filter
	      },
	      backend: backend,
	      attrs: {
	        shape: [1, convInfo.inChannels, convInfo.outChannels]
	      }
	    });
	    var result = batchMatMulImpl({
	      a: xReshaped,
	      b: filterReshaped,
	      transposeA: transposeA,
	      transposeB: transposeB,
	      backend: backend,
	      bias: bias,
	      activation: activation,
	      preluActivationWeights: preluActivationWeights,
	      leakyreluAlpha: leakyreluAlpha
	    });
	    out = reshape$3({
	      inputs: {
	        x: result
	      },
	      backend: backend,
	      attrs: {
	        shape: convInfo.outShape
	      }
	    });
	    intermediates.push(xReshaped);
	    intermediates.push(filterReshaped);
	    intermediates.push(result);
	  } else {
	    // Following optimization is specific to packed |x| with odd row count
	    // (For example, in channelLast mode, 'row count' refers to x.shape[2]):
	    // we avoid expensive packed 2x2 reshape by padding row count to next,
	    // even number. When x.shape[2] is odd, the result of packed batchMatMul is
	    // the same (has the same texture layout and and values in the texture) as
	    // it is for even x.shape[2] + 1. We make the odd-rows tensor to look like
	    // even-rows tensor before the operation and, after the batchMatMul,
	    // fix the even-rows result to have odd number of rows.
	    var _targetShape = isChannelsLast ? xShape[0] * xShape[1] * (xShape[2] + 1) : xShape[0] * xShape[2] * (xShape[3] + 1);

	    var _xReshaped = {
	      dataId: x.dataId,
	      shape: [1, _targetShape, convInfo.inChannels],
	      dtype: x.dtype
	    }; // xTexData.shape gets referenced from GPGPUBinary.inShapeInfos.
	    // Decrementing row count, after batchMatMul->...->compileProgram leads to
	    // invalid row count within the reference in GPGPUBinary.inShapeInfos.
	    // Alternative fix would be to provide a copy to GPGPUBinary.inShapeInfos
	    // in compileProgram method, but that would affect compilation of all
	    // programs - instead, provide a copy here, with even row count, before
	    // calling batchMatMul->...->compileProgram and after that, the original
	    // xTexData.shape is restored.

	    var originalXTexDataShape = xTexData.shape;
	    xTexData.shape = xTexData.shape.slice();
	    xTexData.shape[xTexData.shape.length - 2]++;
	    assert(isReshapeFree(xTexData.shape, _xReshaped.shape), function () {
	      return "packed reshape " + xTexData.shape + " to " + _xReshaped.shape + " isn't free";
	    });

	    var _filterReshaped = reshape$3({
	      inputs: {
	        x: filter
	      },
	      backend: backend,
	      attrs: {
	        shape: [1, convInfo.inChannels, convInfo.outChannels]
	      }
	    });

	    intermediates.push(_filterReshaped);
	    var pointwiseConv = batchMatMulImpl({
	      a: _xReshaped,
	      b: _filterReshaped,
	      backend: backend,
	      transposeA: transposeA,
	      transposeB: transposeB,
	      bias: bias,
	      activation: activation,
	      preluActivationWeights: preluActivationWeights,
	      leakyreluAlpha: leakyreluAlpha
	    });
	    var pointwiseConvTexData = backend.texData.get(pointwiseConv.dataId);
	    assert(pointwiseConvTexData.isPacked, function () {
	      return 'batchMatMul result is expected to be packed';
	    }); // Restore the input shape to original.

	    xTexData.shape = originalXTexDataShape; // Set the output shape - there is no need for expensive reshape as data
	    // layout is already correct.

	    pointwiseConvTexData.shape = convInfo.outShape;
	    out = identity$2({
	      inputs: {
	        x: pointwiseConv
	      },
	      backend: backend
	    });
	    out.shape = convInfo.outShape;
	    intermediates.push(pointwiseConv);
	  }

	  for (var _i = 0, _intermediates = intermediates; _i < _intermediates.length; _i++) {
	    var i = _intermediates[_i];
	    backend.disposeIntermediateTensorInfo(i);
	  }

	  return out;
	}