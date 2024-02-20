function instrument(eventName, promise, child) {
	  if (1 === queue.push({
	    name: eventName,
	    payload: {
	      key: promise._guidKey,
	      id: promise._id,
	      eventName: eventName,
	      detail: promise._result,
	      childId: child && child._id,
	      label: promise._label,
	      timeStamp: now(),
	      error: config["instrument-with-stack"] ? new Error(promise._label) : null
	    } })) {
	    scheduleFlush();
	  }
	}