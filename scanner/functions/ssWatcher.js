function ssWatcher (params, cb) {
		// watches a stylesheet for loading signs.
		if (isLinkReady(params.link)) {
			cleanup(params);
			cb();
		}
		else if (!failed) {
			setTimeout(function () { ssWatcher(params, cb); }, params.wait);
		}
	}