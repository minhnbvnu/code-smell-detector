function createInvalidReporterError(message, reporter) {
	  var err = new TypeError(message);
	  err.code = constants$4.INVALID_REPORTER;
	  err.reporter = reporter;
	  return err;
	}