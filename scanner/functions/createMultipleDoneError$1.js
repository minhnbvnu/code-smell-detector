function createMultipleDoneError$1(runnable, originalErr) {
	  var title;

	  try {
	    title = format('<%s>', runnable.fullTitle());

	    if (runnable.parent.root) {
	      title += ' (of root suite)';
	    }
	  } catch (ignored) {
	    title = format('<%s> (of unknown suite)', runnable.title);
	  }

	  var message = format('done() called multiple times in %s %s', runnable.type ? runnable.type : 'unknown runnable', title);

	  if (runnable.file) {
	    message += format(' of file %s', runnable.file);
	  }

	  if (originalErr) {
	    message += format('; in addition, done() received error: %s', originalErr);
	  }

	  var err = new Error(message);
	  err.code = constants$4.MULTIPLE_DONE;
	  err.valueType = _typeof(originalErr);
	  err.value = originalErr;
	  return err;
	}