function fusedMatMul_(_ref) {
	  var a = _ref.a,
	      b = _ref.b,
	      _ref$transposeA = _ref.transposeA,
	      transposeA = _ref$transposeA === void 0 ? false : _ref$transposeA,
	      _ref$transposeB = _ref.transposeB,
	      transposeB = _ref$transposeB === void 0 ? false : _ref$transposeB,
	      bias = _ref.bias,
	      _ref$activation = _ref.activation,
	      activation = _ref$activation === void 0 ? 'linear' : _ref$activation,
	      preluActivationWeights = _ref.preluActivationWeights,
	      leakyreluAlpha = _ref.leakyreluAlpha;

	  if (shouldFuse(ENGINE.state.gradientDepth, activation) === false) {
	    var result = matMul(a, b, transposeA, transposeB);

	    if (bias != null) {
	      result = add$1(result, bias);
	    }

	    return applyActivation(result, activation, preluActivationWeights, leakyreluAlpha);
	  }

	  var $a = convertToTensor(a, 'a', 'fused matMul');
	  var $b = convertToTensor(b, 'b', 'fused matMul');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];
	  var innerShapeA = transposeA ? $a.shape[$a.rank - 2] : $a.shape[$a.rank - 1];
	  var innerShapeB = transposeB ? $b.shape[$b.rank - 1] : $b.shape[$b.rank - 2];
	  var outerShapeA = transposeA ? $a.shape[$a.rank - 1] : $a.shape[$a.rank - 2];
	  var outerShapeB = transposeB ? $b.shape[$b.rank - 2] : $b.shape[$b.rank - 1];
	  var outerDimsA = $a.shape.slice(0, -2);
	  var outerDimsB = $b.shape.slice(0, -2);
	  var batchDimA = sizeFromShape(outerDimsA);
	  var batchDimB = sizeFromShape(outerDimsB);
	  assert($a.rank >= 2 && $b.rank >= 2 && $a.rank === $b.rank, function () {
	    return "Error in fused matMul: inputs must have the same rank of at " + ("least 2, got ranks " + $a.rank + " and " + $b.rank + ".");
	  });
	  assert(arraysEqual(outerDimsA, outerDimsB), function () {
	    return "Error in fused matMul: outer dimensions (" + outerDimsA + ") and (" + (outerDimsB + ") of Tensors with shapes " + $a.shape + " and ") + ($b.shape + " must match.");
	  });
	  assert(innerShapeA === innerShapeB, function () {
	    return "Error in fused matMul: inner shapes (" + innerShapeA + ") and (" + (innerShapeB + ") of Tensors with shapes " + $a.shape + " and ") + ($b.shape + " and transposeA=" + transposeA) + (" and transposeB=" + transposeB + " must match.");
	  });
	  var outShape = $a.shape.slice(0, -2).concat([outerShapeA, outerShapeB]);
	  var a3D = transposeA ? reshape($a, [batchDimA, innerShapeA, outerShapeA]) : reshape($a, [batchDimA, outerShapeA, innerShapeA]);
	  var b3D = transposeB ? reshape($b, [batchDimB, outerShapeB, innerShapeB]) : reshape($b, [batchDimB, innerShapeB, outerShapeB]);
	  var $bias;

	  if (bias != null) {
	    $bias = convertToTensor(bias, 'bias', 'fused matMul');

	    var _makeTypesMatch2 = makeTypesMatch($bias, $a);

	    $bias = _makeTypesMatch2[0];
	    assertAndGetBroadcastShape(outShape, $bias.shape);
	  }

	  var $preluActivationWeights;

	  if (preluActivationWeights != null) {
	    $preluActivationWeights = convertToTensor(preluActivationWeights, 'prelu weights', 'fused matMul');
	  }

	  var grad = function grad(dy, saved) {
	    var a3D = saved[0],
	        b3D = saved[1],
	        y = saved[2],
	        $bias = saved[3]; // we reshape dy because the result of the forward is not
	    // necessarily going to be a 3d tensor due to a reshape done at the end of
	    // the customOp.

	    var dyActivation = getFusedDyActivation(reshape(dy, y.shape), y, activation);
	    var aDer;
	    var bDer;

	    if (!transposeA && !transposeB) {
	      aDer = matMul(dyActivation, b3D, false, true);
	      bDer = matMul(a3D, dyActivation, true, false);
	    } else if (!transposeA && transposeB) {
	      aDer = matMul(dyActivation, b3D, false, false);
	      bDer = matMul(dyActivation, a3D, true, false);
	    } else if (transposeA && !transposeB) {
	      aDer = matMul(b3D, dyActivation, false, true);
	      bDer = matMul(a3D, dyActivation, false, false);
	    } else {
	      aDer = matMul(b3D, dyActivation, true, true);
	      bDer = matMul(dyActivation, a3D, true, true);
	    }

	    if (bias != null) {
	      var biasDer = getFusedBiasGradient($bias, dyActivation);
	      return [aDer, bDer, biasDer];
	    } else {
	      return [aDer, bDer];
	    }
	  };

	  var inputs = {
	    a: a3D,
	    b: b3D,
	    bias: $bias,
	    preluActivationWeights: $preluActivationWeights
	  };
	  var attrs = {
	    transposeA: transposeA,
	    transposeB: transposeB,
	    activation: activation,
	    leakyreluAlpha: leakyreluAlpha
	  }; // Depending on the the params passed in we will have different number of
	  // inputs and thus a a different number of elements in the gradient.

	  if (bias == null) {
	    var customOp = customGrad(function (a3D, b3D, save) {
	      var res = // tslint:disable-next-line: no-unnecessary-type-assertion
	      ENGINE.runKernel(_FusedMatMul, inputs, attrs);
	      save([a3D, b3D, res]);
	      return {
	        value: reshape(res, outShape),
	        gradFunc: grad
	      };
	    });
	    return customOp(a3D, b3D);
	  } else {
	    var customOpWithBias = customGrad(function (a3D, b3D, $bias, save) {
	      var res = // tslint:disable-next-line: no-unnecessary-type-assertion
	      ENGINE.runKernel(_FusedMatMul, inputs, attrs);
	      save([a3D, b3D, res, $bias]);
	      return {
	        value: reshape(res, outShape),
	        gradFunc: grad
	      };
	    });
	    return customOpWithBias(a3D, b3D, $bias);
	  }
	}