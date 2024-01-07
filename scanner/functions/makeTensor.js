function makeTensor(values, shape, inferredShape, dtype) {
	  if (dtype == null) {
	    dtype = inferDtype(values);
	  }

	  if (dtype === 'complex64') {
	    throw new Error("Cannot construct a complex64 tensor directly. " + "Please use tf.complex(real, imag).");
	  }

	  if (!isTypedArray$1(values) && !Array.isArray(values) && typeof values !== 'number' && typeof values !== 'boolean' && typeof values !== 'string') {
	    throw new Error('values passed to tensor(values) must be a number/boolean/string or ' + 'an array of numbers/booleans/strings, or a TypedArray');
	  }

	  if (shape != null) {
	    assertNonNegativeIntegerDimensions(shape);
	    var providedSize = sizeFromShape(shape);
	    var inferredSize = sizeFromShape(inferredShape);
	    assert(providedSize === inferredSize, function () {
	      return "Based on the provided shape, [" + shape + "], the tensor should have " + (providedSize + " values but has " + inferredSize);
	    });

	    for (var i = 0; i < inferredShape.length; ++i) {
	      var inferred = inferredShape[i];
	      var flatDimsDontMatch = i === inferredShape.length - 1 ? inferred !== sizeFromShape(shape.slice(i)) : true;
	      assert(inferredShape[i] === shape[i] || !flatDimsDontMatch, function () {
	        return "Error creating a new Tensor. Inferred shape " + ("(" + inferredShape + ") does not match the provided ") + ("shape (" + shape + "). ");
	      });
	    }
	  }

	  if (!isTypedArray$1(values) && !Array.isArray(values)) {
	    values = [values];
	  }

	  shape = shape || inferredShape;
	  values = dtype !== 'string' ? toTypedArray(values, dtype) : flatten(values, [], true);
	  return ENGINE.makeTensor(values, shape, dtype);
	}