function walkTensorContainer(container, list, seen) {
	  if (container == null) {
	    return;
	  }

	  if (container instanceof Tensor) {
	    list.push(container);
	    return;
	  }

	  if (!isIterable(container)) {
	    return;
	  } // Iteration over keys works also for arrays.


	  var iterable = container;

	  for (var k in iterable) {
	    var val = iterable[k];

	    if (!seen.has(val)) {
	      seen.add(val);
	      walkTensorContainer(val, list, seen);
	    }
	  }
	}