function loadDetector (params, cb) {
		// It would be nice to use onload everywhere, but the onload handler
		// only works in IE and Opera.
		// Detecting it cross-browser is completely impossible, too, since
		// THE BROWSERS ARE LIARS! DON'T TELL ME YOU HAVE AN ONLOAD PROPERTY
		// IF IT DOESN'T DO ANYTHING!
		var loaded;
		function cbOnce () {
			if (!loaded) {
				loaded = true;
				cb();
			}
		}
		loadHandler(params, cbOnce);
		if (!has("event-link-onload")) {
			ssWatcher(params, cbOnce);
		}
	}