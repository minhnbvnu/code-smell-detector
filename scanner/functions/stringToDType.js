function stringToDType(dtype) {
	  switch (dtype) {
	    case 'float32':
	      return 'float32';

	    default:
	      throw new ValueError("Invalid dtype: " + dtype);
	  }
	}