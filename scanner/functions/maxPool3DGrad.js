function maxPool3DGrad(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var dy = inputs.dy,
	      input = inputs.input;
	  var filterSize = attrs.filterSize,
	      strides = attrs.strides,
	      pad = attrs.pad,
	      dilations = attrs.dilations,
	      dimRoundingMode = attrs.dimRoundingMode;
	  assertNotComplex([dy, input], 'maxPool3DGrad');
	  var convInfo = computePool3DInfo(input.shape, filterSize, strides, dilations, pad, dimRoundingMode);
	  var inputBuf = backend.bufferSync(input);
	  var maxPosBuf = maxPool3dPositions(inputBuf, convInfo);
	  var strideDepth = convInfo.strideDepth;
	  var strideHeight = convInfo.strideHeight;
	  var strideWidth = convInfo.strideWidth;
	  var dilationDepth = convInfo.dilationDepth;
	  var dilationHeight = convInfo.dilationHeight;
	  var dilationWidth = convInfo.dilationWidth;
	  var effectiveFilterDepth = convInfo.effectiveFilterDepth;
	  var effectiveFilterHeight = convInfo.effectiveFilterHeight;
	  var effectiveFilterWidth = convInfo.effectiveFilterWidth;
	  var padFront = effectiveFilterDepth - 1 - convInfo.padInfo.front;
	  var padLeft = effectiveFilterWidth - 1 - convInfo.padInfo.left;
	  var padTop = effectiveFilterHeight - 1 - convInfo.padInfo.top;
	  var dx = buffer(input.shape, 'float32');
	  var dyBuf = backend.bufferSync(dy);

	  for (var batch = 0; batch < convInfo.batchSize; ++batch) {
	    for (var channel = 0; channel < convInfo.inChannels; ++channel) {
	      for (var dxDepth = 0; dxDepth < convInfo.inDepth; ++dxDepth) {
	        for (var dxRow = 0; dxRow < convInfo.inHeight; ++dxRow) {
	          for (var dxCol = 0; dxCol < convInfo.inWidth; ++dxCol) {
	            // Shader code begins
	            var dyDepthCorner = dxDepth - padFront;
	            var dyRowCorner = dxRow - padTop;
	            var dyColCorner = dxCol - padLeft;
	            var dotProd = 0;

	            for (var wDepth = 0; wDepth < effectiveFilterDepth; wDepth += dilationDepth) {
	              var dyDepth = (dyDepthCorner + wDepth) / strideDepth;

	              if (dyDepth < 0 || dyDepth >= convInfo.outDepth || Math.floor(dyDepth) !== dyDepth) {
	                continue;
	              }

	              for (var wRow = 0; wRow < effectiveFilterHeight; wRow += dilationHeight) {
	                var dyRow = (dyRowCorner + wRow) / strideHeight;

	                if (dyRow < 0 || dyRow >= convInfo.outHeight || Math.floor(dyRow) !== dyRow) {
	                  continue;
	                }

	                for (var wCol = 0; wCol < effectiveFilterWidth; wCol += dilationWidth) {
	                  var dyCol = (dyColCorner + wCol) / strideWidth;

	                  if (dyCol < 0 || dyCol >= convInfo.outWidth || Math.floor(dyCol) !== dyCol) {
	                    continue;
	                  }

	                  var maxPos = effectiveFilterDepth * effectiveFilterHeight * effectiveFilterWidth - 1 - maxPosBuf.get(batch, dyDepth, dyRow, dyCol, channel);
	                  var curPos = wDepth * effectiveFilterHeight * effectiveFilterWidth + wRow * effectiveFilterWidth + wCol;
	                  var mask = maxPos === curPos ? 1 : 0;

	                  if (mask === 0) {
	                    continue;
	                  }

	                  var pixel = dyBuf.get(batch, dyDepth, dyRow, dyCol, channel);
	                  dotProd += pixel * mask;
	                }
	              }
	            }

	            dx.set(dotProd, batch, dxDepth, dxRow, dxCol, channel);
	          }
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo(dx.shape, dx.dtype, dx.values);
	}