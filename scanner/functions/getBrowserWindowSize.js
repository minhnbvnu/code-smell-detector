function getBrowserWindowSize() {
	    if ('innerHeight' in commonjsGlobal) {
	      return [commonjsGlobal.innerHeight, commonjsGlobal.innerWidth];
	    } // In a Web Worker, the DOM Window is not available.


	    return [640, 480];
	  }