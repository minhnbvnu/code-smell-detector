function batchMatMul(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var a = inputs.a,
	      b = inputs.b;
	  var transposeA = attrs.transposeA,
	      transposeB = attrs.transposeB;
	  assertNotComplex([a, b], 'matMul');
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

	  var a3d = reshape$2({
	    inputs: {
	      x: a
	    },
	    backend: backend,
	    attrs: {
	      shape: a3dShape
	    }
	  });
	  var b3d = reshape$2({
	    inputs: {
	      x: b
	    },
	    backend: backend,
	    attrs: {
	      shape: b3dShape
	    }
	  });
	  var sharedDim = transposeA ? a3d.shape[1] : a3d.shape[2];
	  var leftDim = transposeA ? a3d.shape[2] : a3d.shape[1];
	  var rightDim = transposeB ? b3d.shape[1] : b3d.shape[2];
	  var batchDim = Math.max(batchDimA, batchDimB);
	  var a3dValues = backend.data.get(a3d.dataId).values;
	  var b3dValues = backend.data.get(b3d.dataId).values;
	  var a3dStrides = computeStrides(a3d.shape);
	  var b3dStrides = computeStrides(b3d.shape);

	  var _ref = transposeA ? [a3dStrides[0], 1, a3dStrides[1]] : [a3dStrides[0], a3dStrides[1], 1],
	      aBatch = _ref[0],
	      aOuterStep = _ref[1],
	      aInnerStep = _ref[2];

	  var _ref2 = transposeB ? [1, b3dStrides[1], b3dStrides[0]] : [b3dStrides[1], 1, b3dStrides[0]],
	      bInnerStep = _ref2[0],
	      bOuterStep = _ref2[1],
	      bBatch = _ref2[2];

	  var size = leftDim * rightDim;
	  var result = buffer([batchDim, leftDim, rightDim], a3d.dtype);
	  var resVals = result.values;
	  var blockSize = backend.blockSize;

	  for (var bi = 0; bi < batchDim; bi++) {
	    for (var i0 = 0; i0 < leftDim; i0 += blockSize) {
	      for (var j0 = 0; j0 < rightDim; j0 += blockSize) {
	        for (var k0 = 0; k0 < sharedDim; k0 += blockSize) {
	          // for when blockSize doesn't evenly divide the input
	          var iBlock = Math.min(i0 + blockSize, leftDim);
	          var jBlock = Math.min(j0 + blockSize, rightDim);
	          var kBlock = Math.min(k0 + blockSize, sharedDim);

	          for (var i = i0; i < iBlock; i++) {
	            for (var j = j0; j < jBlock; j++) {
	              var sum = 0.0;

	              for (var k = k0; k < kBlock; k++) {
	                var batchOffsetA = Math.min(bi, batchDimA - 1) * aBatch;
	                var batchOffsetB = Math.min(bi, batchDimB - 1) * bBatch;
	                var aVal = a3dValues[batchOffsetA + i * aOuterStep + k * aInnerStep];
	                var bVal = b3dValues[k * bInnerStep + j * bOuterStep + batchOffsetB];
	                sum += aVal * bVal;
	              }

	              resVals[bi * size + (i * rightDim + j)] += sum;
	            }
	          }
	        }
	      }
	    }
	  }

	  backend.disposeIntermediateTensorInfo(a3d);
	  backend.disposeIntermediateTensorInfo(b3d); // set correct shape on output.

	  return backend.makeTensorInfo(outShape, result.dtype, result.values);
	}