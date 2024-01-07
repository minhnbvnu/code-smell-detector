function resizeBilinearGrad(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var images = inputs.images,
	      dy = inputs.dy;
	  var alignCorners = attrs.alignCorners;
	  assertNotComplex([dy, images], 'resizeBilinearGrad');
	  var imagesStrides = computeStrides(images.shape);
	  var _images$shape = images.shape,
	      batch = _images$shape[0],
	      xHeight = _images$shape[1],
	      xWidth = _images$shape[2],
	      depth = _images$shape[3];
	  var _dy$shape = dy.shape,
	      yHeight = _dy$shape[1],
	      yWidth = _dy$shape[2];
	  var output = new Float32Array(batch * xHeight * xWidth * depth); // In the backwards pass, we want to find the pixels that were generated
	  // for each pixel in the input image the forward pass and add the
	  // corresponding coefficient from dy to the gradient (with some
	  // interpolation).

	  var effectiveXSize = [alignCorners && yHeight > 1 ? xHeight - 1 : xHeight, alignCorners && yWidth > 1 ? xWidth - 1 : xWidth];
	  var effectiveYSize = [alignCorners && yHeight > 1 ? yHeight - 1 : yHeight, alignCorners && yWidth > 1 ? yWidth - 1 : yWidth];
	  var heightScale = effectiveXSize[0] / effectiveYSize[0];
	  var widthScale = effectiveXSize[1] / effectiveYSize[1]; // Reference implementation
	  // tslint:disable-next-line:max-line-length
	  // https://github.com/tensorflow/tensorflow/blob/3039375c86a5bbc9610c7725dcaa95d635f87ba2/tensorflow/core/kernels/resize_bilinear_op.cc#L275

	  var dyValues = backend.data.get(dy.dataId).values;
	  var offset = 0;

	  for (var b = 0; b < batch; b++) {
	    var bOffset = b * imagesStrides[0];

	    for (var r = 0; r < yHeight; r++) {
	      var dxR = r * heightScale;
	      var topDxRIndex = Math.floor(dxR);
	      var bottomDxRIndex = Math.min(Math.ceil(dxR), xHeight - 1);
	      var topDxROffset = bOffset + topDxRIndex * imagesStrides[1];
	      var bottomDxROffset = bOffset + bottomDxRIndex * imagesStrides[1];
	      var dxRLerp = dxR - topDxRIndex;
	      var inverseDxRLerp = 1.0 - dxRLerp;

	      for (var c = 0; c < yWidth; c++) {
	        var dxC = c * widthScale;
	        var leftDxCIndex = Math.floor(dxC);
	        var rightDxCIndex = Math.min(Math.ceil(dxC), xWidth - 1);
	        var dxCLerp = dxC - leftDxCIndex;
	        var inverseDxCLerp = 1.0 - dxCLerp;
	        var topLeftRCOffset = topDxROffset + leftDxCIndex * imagesStrides[2];
	        var topRightRCOffset = topDxROffset + rightDxCIndex * imagesStrides[2];
	        var bottomLeftRCOffset = bottomDxROffset + leftDxCIndex * imagesStrides[2];
	        var bottomRightRCOffset = bottomDxROffset + rightDxCIndex * imagesStrides[2];
	        var inverseDxRLerpTimesInverseDxCLerp = inverseDxRLerp * inverseDxCLerp;
	        var inverseDxRLerpTimesDxCLerp = inverseDxRLerp * dxCLerp;
	        var dxRLerpTimesInverseDxCLerp = dxRLerp * inverseDxCLerp;
	        var dxRLerpTimesDxCLerp = dxRLerp * dxCLerp;

	        for (var d = 0; d < depth; d++) {
	          var dyVal = dyValues[offset++];
	          output[topLeftRCOffset + d] += dyVal * inverseDxRLerpTimesInverseDxCLerp;
	          output[topRightRCOffset + d] += dyVal * inverseDxRLerpTimesDxCLerp;
	          output[bottomLeftRCOffset + d] += dyVal * dxRLerpTimesInverseDxCLerp;
	          output[bottomRightRCOffset + d] += dyVal * dxRLerpTimesDxCLerp;
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo([batch, xWidth, xHeight, depth], 'float32', output);
	}