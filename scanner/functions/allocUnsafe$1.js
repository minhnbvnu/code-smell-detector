function allocUnsafe$1(that, size) {
	  assertSize$1(size);
	  that = createBuffer$1(that, size < 0 ? 0 : checked$1(size) | 0);

	  if (!Buffer$1.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }

	  return that;
	}