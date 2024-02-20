function deprecationMessage(print, fsName, opts) {
	    if (print) {
	        console.warn(("[" + fsName + "] Direct file system constructor usage is deprecated for this file system, and will be removed in the next major version. Please use the '" + fsName + ".Create(" + (JSON.stringify(opts)) + ", callback)' method instead. See https://github.com/jvilk/BrowserFS/issues/176 for more details."));
	    }
	}