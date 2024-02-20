function alloc$1(that, size, fill, encoding) {
	  assertSize$1(size);

	  if (size <= 0) {
	    return createBuffer$1(that, size);
	  }

	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string' ? createBuffer$1(that, size).fill(fill, encoding) : createBuffer$1(that, size).fill(fill);
	  }

	  return createBuffer$1(that, size);
	}