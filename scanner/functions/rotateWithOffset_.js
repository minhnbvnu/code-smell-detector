function rotateWithOffset_(image, radians, fillValue, center) {
	  if (fillValue === void 0) {
	    fillValue = 0;
	  }

	  if (center === void 0) {
	    center = 0.5;
	  }

	  var $image = convertToTensor(image, 'image', 'rotateWithOffset', 'float32');
	  assert($image.rank === 4, function () {
	    return 'Error in rotateWithOffset: image must be rank 4,' + ("but got rank " + $image.rank + ".");
	  });
	  var inputs = {
	    image: $image
	  };
	  var attrs = {
	    radians: radians,
	    fillValue: fillValue,
	    center: center
	  };
	  var res = ENGINE.runKernel(RotateWithOffset, inputs, attrs);
	  return res;
	}