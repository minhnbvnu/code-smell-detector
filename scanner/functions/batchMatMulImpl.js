function batchMatMulImpl(_ref) {
	  var a = _ref.a,
	      b = _ref.b,
	      transposeA = _ref.transposeA,
	      transposeB = _ref.transposeB,
	      backend = _ref.backend,
	      _ref$bias = _ref.bias,
	      bias = _ref$bias === void 0 ? null : _ref$bias,
	      _ref$preluActivationW = _ref.preluActivationWeights,
	      preluActivationWeights = _ref$preluActivationW === void 0 ? null : _ref$preluActivationW,
	      _ref$leakyreluAlpha = _ref.leakyreluAlpha,
	      leakyreluAlpha = _ref$leakyreluAlpha === void 0 ? 0 : _ref$leakyreluAlpha,
	      _ref$activation = _ref.activation,
	      activation = _ref$activation === void 0 ? null : _ref$activation;
	  var aRank = a.shape.length;
	  var bRank = b.shape.length;
	  var innerShapeA = transposeA ? a.shape[aRank - 2] : a.shape[aRank - 1];
	  var innerShapeB = transposeB ? b.shape[bRank - 1] : b.shape[bRank - 2];
	  var outerShapeA = transposeA ? a.shape[aRank - 1] : a.shape[aRank - 2];
	  var outerShapeB = transposeB ? b.shape[bRank - 2] : b.shape[bRank - 1];
	  var outerDimsA = a.shape.slice(0, -2);
	  var outerDimsB = b.shape.slice(0, -2);
	  var batchDimA = sizeFromShape(outerDimsA);
	  var batchDimB = sizeFromShape(outerDimsB);
	  var batchDimsCompatible = batchDimA === batchDimB || batchDimA === 1 || batchDimB === 1;
	  assert(aRank >= 2 && bRank >= 2 && batchDimsCompatible, function () {
	    return "Error in matMul: the input batch dimensions must either be the " + "same or at least one input batch dimension must be 1. Got input " + ("batch dimensions of (" + outerDimsA + ") and (" + outerDimsB + ").");
	  });
	  var outShapeOuterDims = batchDimA > batchDimB ? a.shape.slice(0, -2) : b.shape.slice(0, -2);
	  var outShape = outShapeOuterDims.concat([outerShapeA, outerShapeB]);
	  assert(innerShapeA === innerShapeB, function () {
	    return "Error in matMul: inner shapes (" + innerShapeA + ") and (" + (innerShapeB + ") of Tensors with shapes " + a.shape + " and ") + (b.shape + " and transposeA=" + transposeA) + (" and transposeB=" + transposeB + " must match.");
	  });
	  var a3dShape = transposeA ? [batchDimA, innerShapeA, outerShapeA] : [batchDimA, outerShapeA, innerShapeA];
	  var b3dShape = transposeB ? [batchDimB, outerShapeB, innerShapeB] : [batchDimB, innerShapeB, outerShapeB]; // The rest of the implementation is designed to operate on rank-3 tensors

	  var a3d = reshape$3({
	    inputs: {
	      x: a
	    },
	    backend: backend,
	    attrs: {
	      shape: a3dShape
	    }
	  });
	  var b3d = reshape$3({
	    inputs: {
	      x: b
	    },
	    backend: backend,
	    attrs: {
	      shape: b3dShape
	    }
	  });
	  var intermediates = [a3d, b3d];
	  var batchDim = Math.max(batchDimA, batchDimB);
	  var sharedDim = transposeA ? a3d.shape[1] : a3d.shape[2];
	  var hasBias = bias != null;
	  var hasPreluActivationWeights = preluActivationWeights != null;
	  var hasLeakyreluAlpha = activation === 'leakyrelu';
	  var fusedActivation = activation != null ? mapActivationToShaderProgram(activation, true) : null;
	  var containsFusedOps = hasBias || hasPreluActivationWeights || hasLeakyreluAlpha || fusedActivation != null;
	  var out; // Since the matrices are vectors, it is faster to call mul().sum()
	  // because sum() is O(sqrt(N)) due to divide-and-conquer.

	  if ((outerShapeA === 1 || outerShapeB === 1) && sharedDim > MATMUL_SHARED_DIM_THRESHOLD && containsFusedOps === false) {
	    var aVec = a3d;
	    var bVec = b3d;

	    if (transposeA) {
	      aVec = transpose$2({
	        inputs: {
	          x: a3d
	        },
	        backend: backend,
	        attrs: {
	          perm: [0, 2, 1]
	        }
	      });
	      intermediates.push(aVec);
	    }

	    if (transposeB) {
	      bVec = transpose$2({
	        inputs: {
	          x: b3d
	        },
	        backend: backend,
	        attrs: {
	          perm: [0, 2, 1]
	        }
	      });
	      intermediates.push(bVec);
	    }

	    var shouldReshapeA = outerShapeB !== 1;
	    var shouldReshapeB = outerShapeB === 1;
	    var aVec3d = aVec;

	    if (shouldReshapeA) {
	      aVec3d = reshape$3({
	        inputs: {
	          x: aVec
	        },
	        backend: backend,
	        attrs: {
	          shape: [batchDim, sharedDim, 1]
	        }
	      });
	      intermediates.push(aVec3d);
	    }

	    var axis = outerShapeB === 1 ? 2 : 1;
	    var bVec3d = bVec;

	    if (shouldReshapeB) {
	      bVec3d = reshape$3({
	        inputs: {
	          x: bVec
	        },
	        backend: backend,
	        attrs: {
	          shape: [batchDim, 1, sharedDim]
	        }
	      });
	      intermediates.push(bVec3d);
	    }

	    var product = multiply$3({
	      inputs: {
	        a: aVec3d,
	        b: bVec3d
	      },
	      backend: backend
	    });
	    out = sum$4({
	      inputs: {
	        x: product
	      },
	      backend: backend,
	      attrs: {
	        axis: axis,
	        keepDims: true
	      }
	    });
	    intermediates.push(product);
	  } else {
	    var dtype = upcastType(a.dtype, b.dtype);
	    var program = new MatMulPackedProgram(a3dShape, b3dShape, [batchDim, outerShapeA, outerShapeB], transposeA, transposeB, hasBias, fusedActivation, hasPreluActivationWeights, hasLeakyreluAlpha);
	    var inputs = [a3d, b3d];

	    if (bias != null) {
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

	    out = backend.runWebGLProgram(program, inputs, dtype);
	  }

	  var outReshaped = reshape$3({
	    inputs: {
	      x: out
	    },
	    backend: backend,
	    attrs: {
	      shape: outShape
	    }
	  });
	  intermediates.push(out);

	  for (var _i = 0, _intermediates = intermediates; _i < _intermediates.length; _i++) {
	    var i = _intermediates[_i];
	    backend.disposeIntermediateTensorInfo(i);
	  }

	  return outReshaped;
	}