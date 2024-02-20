function nextTick$1(fun) {
	  var args = new Array(arguments.length - 1);

	  if (arguments.length > 1) {
	    for (var i = 1; i < arguments.length; i++) {
	      args[i - 1] = arguments[i];
	    }
	  }

	  queue$2.push(new Item$1(fun, args));

	  if (queue$2.length === 1 && !draining$1) {
	    runTimeout$1(drainQueue$1);
	  }
	}