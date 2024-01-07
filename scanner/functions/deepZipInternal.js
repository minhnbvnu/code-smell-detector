function deepZipInternal(inputs, zipFn, containedIn) {
	  if (containedIn === void 0) {
	    containedIn = new Set();
	  }

	  // The recursion follows the structure of input 0; it's assumed that all the
	  // other inputs have the same structure.
	  var input = inputs[0];

	  if (containedIn.has(input)) {
	    throw new Error('Circular references are not supported.');
	  }

	  var result = zipFn(inputs);

	  if (result.recurse && result.value !== null) {
	    throw new Error('A deep zip function may not return both a value and recurse=true.');
	  }

	  if (!result.recurse) {
	    return result.value;
	  } else if (isIterable$1(input)) {
	    // tslint:disable-next-line:no-any
	    var mappedIterable = Array.isArray(input) ? [] : {};
	    containedIn.add(input);

	    var _loop = function _loop(k) {
	      var children = inputs.map(function (x) {
	        return x[k];
	      });
	      var childResult = deepZipInternal(children, zipFn, containedIn);
	      mappedIterable[k] = childResult;
	    };

	    for (var k in input) {
	      _loop(k);
	    }

	    containedIn.delete(input);
	    return mappedIterable;
	  } else {
	    throw new Error("Can't recurse into non-iterable type: " + input);
	  }
	}