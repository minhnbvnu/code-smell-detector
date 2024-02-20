function createMochaInstanceAlreadyRunningError(message, instance) {
	  var err = new Error(message);
	  err.code = constants$4.INSTANCE_ALREADY_RUNNING;
	  err.instance = instance;
	  return err;
	}