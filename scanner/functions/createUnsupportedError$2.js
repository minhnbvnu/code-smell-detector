function createUnsupportedError$2(message) {
	  var err = new Error(message);
	  err.code = constants$4.UNSUPPORTED;
	  return err;
	}