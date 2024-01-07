function flipLeftRight_(image) {
	  var $image = convertToTensor(image, 'image', 'flipLeftRight', 'float32');
	  assert($image.rank === 4, function () {
	    return 'Error in flipLeftRight: image must be rank 4,' + ("but got rank " + $image.rank + ".");
	  });
	  var inputs = {
	    image: $image
	  };
	  var res = ENGINE.runKernel(FlipLeftRight, inputs, {});
	  return res;
	}