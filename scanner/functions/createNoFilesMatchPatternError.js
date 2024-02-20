function createNoFilesMatchPatternError(message, pattern) {
	  var err = new Error(message);
	  err.code = constants$4.NO_FILES_MATCH_PATTERN;
	  err.pattern = pattern;
	  return err;
	}