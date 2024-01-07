function BrowserLocalStorageManager() {
	    assert(env().getBool('IS_BROWSER'), function () {
	      return 'Current environment is not a web browser';
	    });
	    assert(typeof window === 'undefined' || typeof window.localStorage !== 'undefined', function () {
	      return 'Current browser does not appear to support localStorage';
	    });
	    this.LS = window.localStorage;
	  }