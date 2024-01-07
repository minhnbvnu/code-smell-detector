function bytesPerElement(dtype) {
	  if (dtype === 'float32' || dtype === 'int32') {
	    return 4;
	  } else if (dtype === 'complex64') {
	    return 8;
	  } else if (dtype === 'bool') {
	    return 1;
	  } else {
	    throw new Error("Unknown dtype " + dtype);
	  }
	}