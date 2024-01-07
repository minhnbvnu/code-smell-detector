function log$a() {
	  if (!env().getBool('IS_TEST')) {
	    var _console2;

	    (_console2 = console).log.apply(_console2, arguments);
	  }
	}