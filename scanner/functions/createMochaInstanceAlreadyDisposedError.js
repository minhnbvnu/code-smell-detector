function createMochaInstanceAlreadyDisposedError(message, cleanReferencesAfterRun, instance) {
	  var err = new Error(message);
	  err.code = constants$4.INSTANCE_ALREADY_DISPOSED;
	  err.cleanReferencesAfterRun = cleanReferencesAfterRun;
	  err.instance = instance;
	  return err;
	}