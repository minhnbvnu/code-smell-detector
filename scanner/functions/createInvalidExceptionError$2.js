function createInvalidExceptionError$2(message, value) {
	  var err = new Error(message);
	  err.code = constants$4.INVALID_EXCEPTION;
	  err.valueType = _typeof(value);
	  err.value = value;
	  return err;
	}