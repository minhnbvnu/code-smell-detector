function uniqueImpl(values, axis, shape, dtype) {
	  // Normalize and validate axis.
	  var $axis = parseAxisParam(axis, shape)[0]; // Calculate the new shape that is suitable for extracting data along the
	  // given axis.
	  //
	  // The rank is 3.
	  // The size of the 1st dimension is the size of all the axes < the given axis.
	  // The size of the 2nd dimension is the same as the size of the given axis.
	  // The size of the 3rd dimension is the size of all the axes > the given axis.
	  //
	  // For example, for a 4D tensor with shape=[2, 3, 5, 4] and axis=2, the
	  // newShape would be: [2*3, 5, 4].
	  //
	  // Note that this is not the final output shape. This will be the shape for an
	  // intermediate TensorBuffer (see inputBuffer below) to allow us to extract
	  // values along the given axis. To demonstrate how it works, consider the
	  // following example:
	  //
	  // Input: a 3D tensor, with shape [1, 2, 3]
	  // [
	  //   [
	  //      [1,2,3],
	  //      [4,5,6]
	  //   ]
	  // ]
	  // Axis: 2 (the last axis).
	  // Along axis 2, we expect to extract 3 tensors: [1,4], [2,5], [3,6].
	  //
	  // For this example, newShape would be: [2, 3, 1], where 2 is calculated from
	  // 1*2. The re-shaped data would look like:
	  //
	  // [
	  //   [
	  //     [1], [2], [3]
	  //   ],
	  //   [
	  //     [4], [5], [6]
	  //   ]
	  // ]
	  //
	  // Then, we can construct a 3-level nested loop by the following dimension
	  // order to extract the values along the axis (dimension1):
	  // i: dimension1       // 0,1,2 (newShape[1])
	  //   m: dimension0     // 0,1   (newShape[0])
	  //     n: dimension2   // 0     (newShape[2])
	  //
	  //                       m, i, n
	  //                      ---------
	  // Iteration 0: data at [0, 0, 0] => "1"
	  // Iteration 1: data at [1, 0, 0] => "4"
	  // We got [1,4].
	  // Iteration 2: data at [0, 1, 0] => "2"
	  // Iteration 3: data at [1, 1, 0] => "5"
	  // We got [2,5].
	  // Iteration 4: data at [0, 2, 0] => "3"
	  // Iteration 5: data at [1, 2, 0] => "6"
	  // We got [3,6].

	  var newShape = [1, shape[0], 1];

	  for (var i = 0; i < $axis; i++) {
	    newShape[0] *= shape[i];
	  }

	  newShape[1] = shape[$axis];

	  for (var _i = $axis + 1; _i < shape.length; _i++) {
	    newShape[2] *= shape[_i];
	  } // A map from unique elements (their string representations) to their values
	  // in "indices" (below).


	  var uniqueElements = {}; // The indices of each unique element in the original tensor along the given
	  // axis. It is 1D and has the same size as the given axis.

	  var indices = new Int32Array(shape[$axis]); // Create a buffer so we can easily extract value at a given location.

	  var inputBuffer = new TensorBuffer(newShape, dtype, values); // The indices along the given axis that have unique elements. This is a
	  // de-duped version of "indices" above.

	  var uniqueIndices = [];
	  var is1DTensor = newShape[0] === 1 && newShape[2] === 1;

	  for (var _i2 = 0; _i2 < shape[$axis]; _i2++) {
	    // Extract values along the axis.
	    var element = void 0;

	    if (is1DTensor) {
	      // Fast path for 1D tensor input.
	      element = values[_i2].toString();
	    } else {
	      var axisValues = [];

	      for (var m = 0; m < newShape[0]; m++) {
	        for (var n = 0; n < newShape[2]; n++) {
	          axisValues.push(inputBuffer.get(m, _i2, n));
	        }
	      }

	      element = axisValues.join(',');
	    } // Dedup and update various indices.


	    if (uniqueElements[element] !== undefined) {
	      indices[_i2] = uniqueElements[element];
	    } else {
	      var uniqueIndex = Object.keys(uniqueElements).length;
	      uniqueElements[element] = uniqueIndex;
	      indices[_i2] = uniqueIndex;
	      uniqueIndices.push(_i2);
	    }
	  } // Now we know where each of the unique elements are located along the axis
	  // (uniqueIndices). Extract them from input buffer and store them in the
	  // output buffer.


	  var outputTmpShape = newShape.slice();
	  outputTmpShape[1] = Object.keys(uniqueElements).length;
	  var outputBuffer = new TensorBuffer(outputTmpShape, dtype);
	  uniqueIndices.forEach(function (uniqueElementIndex, i) {
	    for (var _m = 0; _m < newShape[0]; _m++) {
	      for (var _n = 0; _n < newShape[2]; _n++) {
	        outputBuffer.set(inputBuffer.get(_m, uniqueElementIndex, _n), _m, i, _n);
	      }
	    }
	  }); // The output shape can be calculated from the input shape with the size of
	  // the given axis replaced by the number of unique elements along that axis.

	  var outputShape = shape.slice();
	  outputShape[$axis] = outputTmpShape[1];
	  return {
	    outputValues: outputBuffer.values,
	    outputShape: outputShape,
	    indices: indices
	  };
	}