function cropAndResize$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var image = inputs.image,
	      boxes = inputs.boxes,
	      boxInd = inputs.boxInd;
	  var cropSize = attrs.cropSize,
	      method = attrs.method,
	      extrapolationValue = attrs.extrapolationValue;
	  var _image$shape = image.shape,
	      batch = _image$shape[0],
	      imageHeight = _image$shape[1],
	      imageWidth = _image$shape[2],
	      numChannels = _image$shape[3];
	  var numBoxes = boxes.shape[0];
	  var cropHeight = cropSize[0],
	      cropWidth = cropSize[1];
	  var output = buffer([numBoxes, cropHeight, cropWidth, numChannels], 'float32');
	  var boxVals = backend.data.get(boxes.dataId).values;
	  var boxIndVals = backend.data.get(boxInd.dataId).values;
	  var imageVals = backend.data.get(image.dataId).values;
	  var inStride = computeStrides(image.shape); // to calculate flat indexes into image

	  var outStride = computeStrides(output.shape); // to calculate flat indexes into output
	  // Reference implementation
	  // tslint:disable-next-line:max-line-length
	  // https://github.com/tensorflow/tensorflow/blob/master/tensorflow/core/kernels/crop_and_resize_op.cc

	  for (var b = 0; b < numBoxes; b++) {
	    var startInd = b * 4;
	    var y1 = boxVals[startInd];
	    var x1 = boxVals[startInd + 1];
	    var y2 = boxVals[startInd + 2];
	    var x2 = boxVals[startInd + 3];
	    var bInd = boxIndVals[b];

	    if (bInd >= batch) {
	      continue;
	    }

	    var heightScale = cropHeight > 1 ? (y2 - y1) * (imageHeight - 1) / (cropHeight - 1) : 0;
	    var widthScale = cropWidth > 1 ? (x2 - x1) * (imageWidth - 1) / (cropWidth - 1) : 0;

	    for (var y = 0; y < cropHeight; y++) {
	      var yInd = cropHeight > 1 ? y1 * (imageHeight - 1) + y * heightScale : 0.5 * (y1 + y2) * (imageHeight - 1);

	      if (yInd < 0 || yInd > imageHeight - 1) {
	        for (var x = 0; x < cropWidth; x++) {
	          for (var c = 0; c < numChannels; c++) {
	            var ind = c + x * outStride[2] + y * outStride[1] + b * outStride[0];
	            output.values[ind] = extrapolationValue;
	          }
	        }

	        continue;
	      }

	      if (method === 'bilinear') {
	        var topInd = Math.floor(yInd);
	        var bottomInd = Math.ceil(yInd);
	        var yLerp = yInd - topInd;

	        for (var _x = 0; _x < cropWidth; _x++) {
	          var xInd = cropWidth > 1 ? x1 * (imageWidth - 1) + _x * widthScale : 0.5 * (x1 + x2) * (imageWidth - 1);

	          if (xInd < 0 || xInd > imageWidth - 1) {
	            for (var _c = 0; _c < numChannels; _c++) {
	              var _ind = _c + _x * outStride[2] + y * outStride[1] + b * outStride[0];

	              output.values[_ind] = extrapolationValue;
	            }

	            continue;
	          }

	          var leftInd = Math.floor(xInd);
	          var rightInd = Math.ceil(xInd);
	          var xLerp = xInd - leftInd;

	          for (var _c2 = 0; _c2 < numChannels; _c2++) {
	            var _ind2 = _c2 + leftInd * inStride[2] + topInd * inStride[1] + bInd * inStride[0];

	            var topLeft = imageVals[_ind2];
	            _ind2 = _c2 + rightInd * inStride[2] + topInd * inStride[1] + bInd * inStride[0];
	            var topRight = imageVals[_ind2];
	            _ind2 = _c2 + leftInd * inStride[2] + bottomInd * inStride[1] + bInd * inStride[0];
	            var bottomLeft = imageVals[_ind2];
	            _ind2 = _c2 + rightInd * inStride[2] + bottomInd * inStride[1] + bInd * inStride[0];
	            var bottomRight = imageVals[_ind2];
	            var top = topLeft + (topRight - topLeft) * xLerp;
	            var bottom = bottomLeft + (bottomRight - bottomLeft) * xLerp;
	            _ind2 = _c2 + _x * outStride[2] + y * outStride[1] + b * outStride[0];
	            output.values[_ind2] = top + (bottom - top) * yLerp;
	          }
	        }
	      } else {
	        // method == "nearest"
	        for (var _x2 = 0; _x2 < cropWidth; ++_x2) {
	          var _xInd = cropWidth > 1 ? x1 * (imageWidth - 1) + _x2 * widthScale : 0.5 * (x1 + x2) * (imageWidth - 1);

	          if (_xInd < 0 || _xInd > imageWidth - 1) {
	            for (var _c3 = 0; _c3 < numChannels; _c3++) {
	              var _ind3 = _c3 + _x2 * outStride[2] + y * outStride[1] + b * outStride[0];

	              output.values[_ind3] = extrapolationValue;
	            }

	            continue;
	          }

	          var closestX = Math.round(_xInd);
	          var closestY = Math.round(yInd);

	          for (var _c4 = 0; _c4 < numChannels; _c4++) {
	            var inInd = _c4 + closestX * inStride[2] + closestY * inStride[1] + bInd * inStride[0];
	            var outInd = _c4 + _x2 * outStride[2] + y * outStride[1] + b * outStride[0];
	            output.values[outInd] = imageVals[inInd];
	          }
	        }
	      }
	    }
	  }

	  return backend.makeTensorInfo(output.shape, output.dtype, output.values);
	}