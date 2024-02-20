function createInvalidInterfaceError(message, ui) {
	  var err = new Error(message);
	  err.code = constants$4.INVALID_INTERFACE;
	  err["interface"] = ui;
	  return err;
	}