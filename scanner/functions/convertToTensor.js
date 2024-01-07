function convertToTensor(x, argName, functionName, parseAsDtype) {
	  if (parseAsDtype === void 0) {
	    parseAsDtype = 'numeric';
	  }

	  if (x instanceof Tensor) {
	    assertDtype(parseAsDtype, x.dtype, argName, functionName);
	    return x;
	  }

	  var inferredDtype = inferDtype(x); // If the user expects a bool/int/float, use that info to update the
	  // inferredDtype when it is not a string.

	  if (inferredDtype !== 'string' && ['bool', 'int32', 'float32'].indexOf(parseAsDtype) >= 0) {
	    inferredDtype = parseAsDtype;
	  }

	  assertDtype(parseAsDtype, inferredDtype, argName, functionName);

	  if (x == null || !isTypedArray$1(x) && !Array.isArray(x) && typeof x !== 'number' && typeof x !== 'boolean' && typeof x !== 'string') {
	    var type = x == null ? 'null' : x.constructor.name;
	    throw new Error("Argument '" + argName + "' passed to '" + functionName + "' must be a " + ("Tensor or TensorLike, but got '" + type + "'"));
	  }

	  var inferredShape = inferShape(x, inferredDtype);

	  if (!isTypedArray$1(x) && !Array.isArray(x)) {
	    x = [x];
	  }

	  var skipTypedArray = true;
	  var values = inferredDtype !== 'string' ? toTypedArray(x, inferredDtype) : flatten(x, [], skipTypedArray);
	  return ENGINE.makeTensor(values, inferredShape, inferredDtype);
	}