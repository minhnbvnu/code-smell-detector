function createTimeoutError$1(msg, timeout, file) {
	  var err = new Error(msg);
	  err.code = constants$4.TIMEOUT;
	  err.timeout = timeout;
	  err.file = file;
	  return err;
	}