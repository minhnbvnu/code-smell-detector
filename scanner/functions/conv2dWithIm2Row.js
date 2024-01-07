function conv2dWithIm2Row(_ref2) {
	  var x = _ref2.x,
	      filter = _ref2.filter,
	      convInfo = _ref2.convInfo,
	      backend = _ref2.backend,
	      _ref2$bias = _ref2.bias,
	      bias = _ref2$bias === void 0 ? null : _ref2$bias,
	      _ref2$preluActivation = _ref2.preluActivationWeights,
	      preluActivationWeights = _ref2$preluActivation === void 0 ? null : _ref2$preluActivation,
	      _ref2$leakyreluAlpha = _ref2.leakyreluAlpha,
	      leakyreluAlpha = _ref2$leakyreluAlpha === void 0 ? 0 : _ref2$leakyreluAlpha,
	      _ref2$activation = _ref2.activation,
	      activation = _ref2$activation === void 0 ? null : _ref2$activation;
	  // Rearranges conv2d input so each block to be convolved over forms the
	  // column of a new matrix with shape [filterWidth * filterHeight *
	  // inChannels, outHeight * outWidth]. The filter is also rearranged so each
	  // output channel forms a row of a new matrix with shape [outChannels,
	  // filterWidth * filterHeight * inChannels]. The convolution is then
	  // computed by multiplying these matrices and reshaping the result.
	  var filterWidth = convInfo.filterWidth,
	      filterHeight = convInfo.filterHeight,
	      inChannels = convInfo.inChannels,
	      outWidth = convInfo.outWidth,
	      outHeight = convInfo.outHeight,
	      dataFormat = convInfo.dataFormat;
	  var isChannelsLast = dataFormat === 'channelsLast';
	  var sharedDim = filterWidth * filterHeight * inChannels;
	  var numCols = outHeight * outWidth;
	  var x2ColShape = [sharedDim, numCols];
	  var transposeA = true;
	  var transposeB = false;
	  var intermediates = [];
	  var xSqueezed = reshape$3({
	    inputs: {
	      x: x
	    },
	    backend: backend,
	    attrs: {
	      shape: x.shape.slice(1)
	    }
	  });
	  var w2Row = reshape$3({
	    inputs: {
	      x: filter
	    },
	    backend: backend,
	    attrs: {
	      shape: [1, sharedDim, sizeFromShape(filter.shape) / sharedDim]
	    }
	  });
	  intermediates.push(xSqueezed);
	  intermediates.push(w2Row);
	  var im2ColProgram = new Im2ColPackedProgram(x2ColShape, xSqueezed.shape, convInfo);
	  var im2Col = backend.runWebGLProgram(im2ColProgram, [xSqueezed], 'float32');
	  var im2ColReshaped = reshape$3({
	    inputs: {
	      x: im2Col
	    },
	    backend: backend,
	    attrs: {
	      shape: [1, x2ColShape[0], x2ColShape[1]]
	    }
	  });
	  intermediates.push(im2Col);
	  intermediates.push(im2ColReshaped);
	  var hasBias = bias != null;
	  var hasPreluActivationWeights = preluActivationWeights != null;
	  var hasLeakyreluAlpha = activation === 'leakyrelu';
	  var fusedActivation = activation ? mapActivationToShaderProgram(activation, true) : null;
	  var matmulProgram = new MatMulPackedProgram(im2ColReshaped.shape, w2Row.shape, [1, numCols, convInfo.outChannels], transposeA, transposeB, hasBias, fusedActivation, hasPreluActivationWeights, hasLeakyreluAlpha);
	  var inputs = [im2ColReshaped, w2Row];

	  if (bias) {
	    inputs.push(bias);
	  }

	  if (hasPreluActivationWeights) {
	    inputs.push(preluActivationWeights);
	  }

	  if (hasLeakyreluAlpha) {
	    var $leakyreluAlpha = backend.makeTensorInfo([], 'float32', createScalarValue(leakyreluAlpha, 'float32'));
	    inputs.push($leakyreluAlpha);
	    intermediates.push($leakyreluAlpha);
	  }

	  var product = backend.runWebGLProgram(matmulProgram, inputs, 'float32');
	  var outShape = isChannelsLast ? [1, outHeight, outWidth, convInfo.outChannels] : [1, convInfo.outChannels, outHeight, outWidth];
	  var out = reshape$3({
	    inputs: {
	      x: product
	    },
	    backend: backend,
	    attrs: {
	      shape: outShape
	    }
	  });
	  intermediates.push(product);

	  for (var _i2 = 0, _intermediates2 = intermediates; _i2 < _intermediates2.length; _i2++) {
	    var i = _intermediates2[_i2];
	    backend.disposeIntermediateTensorInfo(i);
	  }

	  return out;
	}