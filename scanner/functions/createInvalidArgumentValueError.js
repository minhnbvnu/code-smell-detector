function createInvalidArgumentValueError(message, argument, value, reason) {
	  var err = new TypeError(message);
	  err.code = constants$4.INVALID_ARG_VALUE;
	  err.argument = argument;
	  err.value = value;
	  err.reason = typeof reason !== 'undefined' ? reason : 'is invalid';
	  return err;
	}