function epsilon() {
	  if (_epsilon == null) {
	    _epsilon = backend().epsilon();
	  }

	  return _epsilon;
	}