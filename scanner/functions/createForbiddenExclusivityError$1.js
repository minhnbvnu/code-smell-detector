function createForbiddenExclusivityError$1(mocha) {
	  var err = new Error(mocha.isWorker ? '`.only` is not supported in parallel mode' : '`.only` forbidden by --forbid-only');
	  err.code = constants$4.FORBIDDEN_EXCLUSIVITY;
	  return err;
	}