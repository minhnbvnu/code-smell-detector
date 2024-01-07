function deepMapInternal(input, mapFn, seen, containedIn) {
	  if (seen === void 0) {
	    seen = new Map();
	  }

	  if (containedIn === void 0) {
	    containedIn = new Set();
	  }

	  if (input == null) {
	    return null;
	  }

	  if (containedIn.has(input)) {
	    throw new Error('Circular references are not supported.');
	  }

	  if (seen.has(input)) {
	    return seen.get(input);
	  }

	  var result = mapFn(input);

	  if (result.recurse && result.value !== null) {
	    throw new Error('A deep map function may not return both a value and recurse=true.');
	  }

	  if (!result.recurse) {
	    seen.set(input, result.value);
	    return result.value;
	  } else if (isIterable$1(input)) {
	    // tslint:disable-next-line:no-any
	    var mappedIterable = Array.isArray(input) ? [] : {};
	    containedIn.add(input);

	    for (var k in input) {
	      var child = input[k];
	      var childResult = deepMapInternal(child, mapFn, seen, containedIn);
	      mappedIterable[k] = childResult;
	    }

	    containedIn.delete(input);
	    return mappedIterable;
	  } else {
	    throw new Error("Can't recurse into non-iterable type: " + input);
	  }
	}