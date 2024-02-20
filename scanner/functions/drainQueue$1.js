function drainQueue$1() {
	  if (draining$1) {
	    return;
	  }

	  var timeout = runTimeout$1(cleanUpNextTick$1);
	  draining$1 = true;
	  var len = queue$2.length;

	  while (len) {
	    currentQueue$1 = queue$2;
	    queue$2 = [];

	    while (++queueIndex$1 < len) {
	      if (currentQueue$1) {
	        currentQueue$1[queueIndex$1].run();
	      }
	    }

	    queueIndex$1 = -1;
	    len = queue$2.length;
	  }

	  currentQueue$1 = null;
	  draining$1 = false;
	  runClearTimeout$1(timeout);
	}