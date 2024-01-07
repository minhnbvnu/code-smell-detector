function getIndexedDBFactory() {
	  if (!env().getBool('IS_BROWSER')) {
	    // TODO(cais): Add more info about what IOHandler subtypes are available.
	    //   Maybe point to a doc page on the web and/or automatically determine
	    //   the available IOHandlers and print them in the error message.
	    throw new Error('Failed to obtain IndexedDB factory because the current environment' + 'is not a web browser.');
	  } // tslint:disable-next-line:no-any


	  var theWindow = typeof window === 'undefined' ? self : window;
	  var factory = theWindow.indexedDB || theWindow.mozIndexedDB || theWindow.webkitIndexedDB || theWindow.msIndexedDB || theWindow.shimIndexedDB;

	  if (factory == null) {
	    throw new Error('The current browser does not appear to support IndexedDB.');
	  }

	  return factory;
	}