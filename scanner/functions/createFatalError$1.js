function createFatalError$1(message, value) {
	  var err = new Error(message);
	  err.code = constants$4.FATAL;
	  err.valueType = _typeof(value);
	  err.value = value;
	  return err;
	}