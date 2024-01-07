function resizeBilinear_(images, size, alignCorners, halfPixelCenters) {
	  if (alignCorners === void 0) {
	    alignCorners = false;
	  }

	  if (halfPixelCenters === void 0) {
	    halfPixelCenters = false;
	  }

	  var $images = convertToTensor(images, 'images', 'resizeBilinear');
	  assert($images.rank === 3 || $images.rank === 4, function () {
	    return "Error in resizeBilinear: x must be rank 3 or 4, but got " + ("rank " + $images.rank + ".");
	  });
	  assert(size.length === 2, function () {
	    return "Error in resizeBilinear: new shape must 2D, but got shape " + (size + ".");
	  });
	  assert(halfPixelCenters === false || alignCorners === false, function () {
	    return "Error in resizeBilinear: If halfPixelCenters is true, " + "alignCorners must be false.";
	  });
	  var batchImages = $images;
	  var reshapedTo4D = false;

	  if ($images.rank === 3) {
	    reshapedTo4D = true;
	    batchImages = reshape($images, [1, $images.shape[0], $images.shape[1], $images.shape[2]]);
	  }

	  var inputs = {
	    images: batchImages
	  };
	  var attrs = {
	    alignCorners: alignCorners,
	    halfPixelCenters: halfPixelCenters,
	    size: size
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(ResizeBilinear, inputs, attrs);

	  if (reshapedTo4D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
	  }

	  return res;
	}