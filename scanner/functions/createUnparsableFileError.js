function createUnparsableFileError(message, filename) {
	  var err = new Error(message);
	  err.code = constants$4.UNPARSABLE_FILE;
	  return err;
	}