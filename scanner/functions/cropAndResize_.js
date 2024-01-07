function cropAndResize_(image, boxes, boxInd, cropSize, method, extrapolationValue) {
	  if (method === void 0) {
	    method = 'bilinear';
	  }

	  if (extrapolationValue === void 0) {
	    extrapolationValue = 0;
	  }

	  var $image = convertToTensor(image, 'image', 'cropAndResize');
	  var $boxes = convertToTensor(boxes, 'boxes', 'cropAndResize', 'float32');
	  var $boxInd = convertToTensor(boxInd, 'boxInd', 'cropAndResize', 'int32');
	  var numBoxes = $boxes.shape[0];
	  assert($image.rank === 4, function () {
	    return 'Error in cropAndResize: image must be rank 4,' + ("but got rank " + $image.rank + ".");
	  });
	  assert($boxes.rank === 2 && $boxes.shape[1] === 4, function () {
	    return "Error in cropAndResize: boxes must be have size [" + numBoxes + ",4] " + ("but had shape " + $boxes.shape + ".");
	  });
	  assert($boxInd.rank === 1 && $boxInd.shape[0] === numBoxes, function () {
	    return "Error in cropAndResize: boxInd must be have size [" + numBoxes + "] " + ("but had shape " + $boxes.shape + ".");
	  });
	  assert(cropSize.length === 2, function () {
	    return "Error in cropAndResize: cropSize must be of length 2, but got " + ("length " + cropSize.length + ".");
	  });
	  assert(cropSize[0] >= 1 && cropSize[1] >= 1, function () {
	    return "cropSize must be atleast [1,1], but was " + cropSize;
	  });
	  assert(method === 'bilinear' || method === 'nearest', function () {
	    return "method must be bilinear or nearest, but was " + method;
	  });
	  var inputs = {
	    image: $image,
	    boxes: $boxes,
	    boxInd: $boxInd
	  };
	  var attrs = {
	    method: method,
	    extrapolationValue: extrapolationValue,
	    cropSize: cropSize
	  };
	  var res = ENGINE.runKernel(CropAndResize, inputs, attrs);
	  return res;
	}