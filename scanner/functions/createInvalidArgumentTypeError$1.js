function createInvalidArgumentTypeError$1(message, argument, expected) {
	  var err = new TypeError(message);
	  err.code = constants$4.INVALID_ARG_TYPE;
	  err.argument = argument;
	  err.expected = expected;
	  err.actual = _typeof(argument);
	  return err;
	}