function spaceToBatchND$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var blockShape = attrs.blockShape,
	      paddings = attrs.paddings;
	  assertNotComplex([x], 'spaceToBatchND');
	  var prod = sizeFromShape(blockShape);
	  var completePaddings = [[0, 0]];
	  completePaddings.push.apply(completePaddings, paddings);

	  for (var i = 1 + blockShape.length; i < x.shape.length; ++i) {
	    completePaddings.push([0, 0]);
	  }

	  var paddedX = padV2Config.kernelFunc({
	    inputs: {
	      x: x
	    },
	    backend: backend,
	    attrs: {
	      paddings: completePaddings,
	      constantValue: 0
	    }
	  });
	  var reshapedPaddedShape = getReshaped(paddedX.shape, blockShape, prod, false);
	  var permutedReshapedPaddedPermutation = getPermuted(reshapedPaddedShape.length, blockShape.length, false);
	  var flattenShape = getReshapedPermuted(paddedX.shape, blockShape, prod, false);
	  var reshapeInputs = {
	    x: paddedX
	  };
	  var reshapeAttrs = {
	    shape: reshapedPaddedShape
	  };
	  var paddedXReshaped = reshape$2({
	    inputs: reshapeInputs,
	    backend: backend,
	    attrs: reshapeAttrs
	  });
	  var transposeInputs = {
	    x: paddedXReshaped
	  };
	  var transposeAttrs = {
	    perm: permutedReshapedPaddedPermutation
	  };
	  var paddedXT = transpose$1({
	    inputs: transposeInputs,
	    backend: backend,
	    attrs: transposeAttrs
	  });
	  var resultReshapeInputs = {
	    x: paddedXT
	  };
	  var resultReshapeAttrs = {
	    shape: flattenShape
	  };
	  var result = reshape$2({
	    inputs: resultReshapeInputs,
	    backend: backend,
	    attrs: resultReshapeAttrs
	  });
	  backend.disposeIntermediateTensorInfo(paddedX);
	  backend.disposeIntermediateTensorInfo(paddedXReshaped);
	  backend.disposeIntermediateTensorInfo(paddedXT);
	  return result;
	}