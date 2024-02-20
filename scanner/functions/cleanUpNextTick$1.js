function cleanUpNextTick$1() {
	  if (!draining$1 || !currentQueue$1) {
	    return;
	  }

	  draining$1 = false;

	  if (currentQueue$1.length) {
	    queue$2 = currentQueue$1.concat(queue$2);
	  } else {
	    queueIndex$1 = -1;
	  }

	  if (queue$2.length) {
	    drainQueue$1();
	  }
	}