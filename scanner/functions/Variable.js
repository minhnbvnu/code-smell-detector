function variable(initialValue, trainable, name, dtype) {
	  if (trainable === void 0) {
	    trainable = true;
	  }

	  return ENGINE.makeVariable(initialValue, trainable, name, dtype);
	}